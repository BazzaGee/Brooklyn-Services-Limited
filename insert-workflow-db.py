#!/usr/bin/env python3
"""
Insert Brooklyn Services Chatbot workflow directly into n8n database
This bypasses the API authentication issues
"""

import sqlite3
import json
import uuid
from datetime import datetime
import sys

# Workflow JSON
WORKFLOW = {
    "name": "Brooklyn Services Limited CB",
    "nodes": [
        {
            "parameters": {
                "public": True,
                "mode": "hostedChat",
                "initialMessages": "Kia ora! Welcome to Brooklyn Services Limited. 👋\nI'm here to help with plumbing, drainage, utility locating, or leak detection questions.\nHow can I assist you today?",
                "options": {}
            },
            "id": "chat-trigger-1",
            "name": "When chat message received",
            "type": "@n8n/n8n-nodes-langchain.chatTrigger",
            "typeVersion": 1.3,
            "position": [-800, -300]
        },
        {
            "parameters": {
                "promptType": "define",
                "text": "=User: {{$json.chatInput}}",
                "options": {
                    "systemMessage": "=You are a friendly, knowledgeable assistant for Brooklyn Services Limited, a Christchurch-based company specialising in plumbing, drainage, utility locating, and leak detection services.\n\nCOMPANY PROFILE:\n- Founded: 2011 by Sam Aitken\n- 50+ years combined team experience\n- NO after-hours call-out fee (extremely rare!)\n- Licensed plumbers and drainlayers\n- 24/7 emergency service: 0800 1 BROOK (0800 127 665)\n- Rinnai & Electrolux authorized agents (Canterbury-wide)\n\nSERVICES:\n1. Plumbing: Hot water, renovations, gas fitting, backflow, filters\n2. Drainage: Blocked drains (CCTV + water blaster), septic, stormwater\n3. Utility Locating: GPR, electromagnetic (South Island-wide)\n4. Leak Detection: Acoustic, thermal imaging (South Island-wide)\n\nEMERGENCY: If user mentions burst pipe, flooding, gas leak, sewage - IMMEDIATELY provide emergency number and emphasize NO after-hours fee!",
                    "maxIterations": 3
                }
            },
            "id": "ai-agent-1",
            "name": "AI Agent",
            "type": "@n8n/n8n-nodes-langchain.agent",
            "typeVersion": 2.1,
            "position": [-480, -300]
        },
        {
            "parameters": {
                "contextWindowLength": 10
            },
            "id": "memory-1",
            "name": "Simple Memory",
            "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
            "typeVersion": 1.3,
            "position": [-500, -100]
        },
        {
            "parameters": {
                "mode": "retrieve-as-tool",
                "toolDescription": "Contains ALL service information for Brooklyn Services Limited.",
                "pineconeIndex": "brooklyn-services-kb",
                "topK": 5,
                "options": {
                    "pineconeNamespace": "bsl-chatbot-v1"
                }
            },
            "id": "vs-docs-1",
            "name": "VS Docs",
            "type": "@n8n/n8n-nodes-langchain.vectorStorePinecone",
            "typeVersion": 1.3,
            "position": [-350, -150]
        },
        {
            "parameters": {
                "options": {
                    "dimensions": 512
                }
            },
            "id": "embeddings-1",
            "name": "Embeddings OpenAI",
            "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
            "typeVersion": 1.2,
            "position": [-200, 0]
        },
        {
            "parameters": {
                "model": "openai/gpt-oss-120b:free",
                "options": {}
            },
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
            "typeVersion": 1,
            "position": [-650, -200],
            "id": "openrouter-primary",
            "name": "OpenRouter Primary"
        },
        {
            "parameters": {
                "model": "moonshotai/kimi-k2.5",
                "options": {}
            },
            "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
            "typeVersion": 1,
            "position": [-650, -50],
            "id": "openrouter-fallback",
            "name": "OpenRouter Fallback"
        },
        {
            "parameters": {
                "resource": "search",
                "query": "={{ $json.chatInput }}",
                "options": {
                    "searchDepth": "advanced",
                    "maxResults": 5
                }
            },
            "id": "tavily-1",
            "name": "Web Search",
            "type": "@tavily/n8n-nodes-tavily.tavilyTool",
            "typeVersion": 1,
            "position": [-150, -150]
        },
        {
            "parameters": {
                "assignments": {
                    "assignments": [
                        {
                            "id": "response",
                            "name": "text",
                            "value": "={{ $json.output }}",
                            "type": "string"
                        }
                    ]
                },
                "options": {}
            },
            "id": "set-response",
            "name": "Set Response",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [0, -300]
        }
    ],
    "connections": {
        "When chat message received": {
            "main": [
                [
                    {
                        "node": "AI Agent",
                        "type": "main",
                        "index": 0
                    }
                ]
            ]
        },
        "AI Agent": {
            "main": [
                [
                    {
                        "node": "Set Response",
                        "type": "main",
                        "index": 0
                    }
                ]
            ],
            "ai_memory": [
                [
                    {
                        "node": "Simple Memory",
                        "type": "ai_memory",
                        "index": 0
                    }
                ]
            ],
            "ai_tool": [
                [
                    {
                        "node": "VS Docs",
                        "type": "ai_tool",
                        "index": 0
                    }
                ],
                [
                    {
                        "node": "Web Search",
                        "type": "ai_tool",
                        "index": 0
                    }
                ]
            ],
            "ai_languageModel": [
                [
                    {
                        "node": "OpenRouter Primary",
                        "type": "ai_languageModel",
                        "index": 0
                    }
                ],
                [
                    {
                        "node": "OpenRouter Fallback",
                        "type": "ai_languageModel",
                        "index": 1
                    }
                ]
            ]
        },
        "VS Docs": {
            "ai_embedding": [
                [
                    {
                        "node": "Embeddings OpenAI",
                        "type": "ai_embedding",
                        "index": 0
                    }
                ]
            ]
        }
    },
    "settings": {
        "executionOrder": "v1",
        "binaryMode": "separate"
    }
}

def insert_workflow():
    """Insert workflow into n8n database."""
    try:
        # Connect to n8n database (in user's home directory)
        import os
        n8n_db_path = os.path.expanduser('~/.n8n/database.sqlite')
        conn = sqlite3.connect(n8n_db_path)
        cursor = conn.cursor()
        
        # Generate workflow ID and version ID
        workflow_id = str(uuid.uuid4())
        version_id = str(uuid.uuid4())
        now = datetime.now().isoformat()
        user_id = "af479062-3a2c-4c7c-9e13-ebe0ba4e327c"
        
        # Project ID (found from database)
        project_id = "dTsCf4gYRdqzSYww"
        
        # Insert workflow
        cursor.execute("""
            INSERT INTO workflow_entity 
            (id, name, active, nodes, connections, settings, staticData, meta, createdAt, updatedAt, versionId, versionCounter)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            workflow_id,
            WORKFLOW["name"],
            0,  # Not active
            json.dumps(WORKFLOW["nodes"]),
            json.dumps(WORKFLOW["connections"]),
            json.dumps(WORKFLOW["settings"]),
            None,
            None,
            now,
            now,
            version_id,
            1
        ))
        
        # Insert shared workflow record
        cursor.execute("""
            INSERT INTO shared_workflow 
            (workflowId, projectId, role, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?)
        """, (workflow_id, project_id, 'workflow:owner', now, now))
        
        conn.commit()
        conn.close()
        
        print(f"[OK] Workflow created successfully!")
        print(f"  ID: {workflow_id}")
        print(f"  Name: {WORKFLOW['name']}")
        print(f"  Nodes: {len(WORKFLOW['nodes'])}")
        print(f"\n[IMPORTANT] You need to:")
        print(f"  1. Open n8n: http://localhost:5678")
        print(f"  2. Find workflow: '{WORKFLOW['name']}'")
        print(f"  3. Configure credentials for AI Agent nodes")
        print(f"  4. Connect tool ports (ai_memory, ai_tool, ai_languageModel)")
        print(f"  5. Activate the workflow")
        
        return True
        
    except Exception as e:
        print(f"[ERROR] Failed to insert workflow: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Inserting Brooklyn Services Chatbot into n8n database")
    print("=" * 60)
    print()
    
    if insert_workflow():
        sys.exit(0)
    else:
        sys.exit(1)