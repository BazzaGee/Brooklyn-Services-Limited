#!/usr/bin/env python3
"""Fix Google Sheets node configuration"""

import sqlite3
import json
import uuid

db_path = 'C:/Users/barry/.n8n/database.sqlite'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

workflow_id = '03b3bb99-9f85-4c06-b53f-8d70e0a274e8'

cursor.execute('SELECT nodes FROM workflow_entity WHERE id=?', (workflow_id,))
result = cursor.fetchone()

if result:
    nodes = json.loads(result[0])
    
    for node in nodes:
        if node['id'] == '43145419-e5d7-45d9-8924-e45bf58f25b1':
            print("Found Google Sheets node, fixing...")
            
            # Build the column mappings properly
            columns_value = {
                "Timestamp": "={{ $now.setZone('Pacific/Auckland').toFormat('yyyy-MM-dd HH:mm:ss') }}",
                "Session_ID": "={{ $('When chat message received').item.json.sessionId }}",
                "Customer_Input": "={{ $('When chat message received').item.json.chatInput }}",
                "AI_Response": "={{ $json.output }}"
            }
            
            node['parameters'] = {
                "operation": "append",
                "documentId": {
                    "__rl": True,
                    "value": "1-9iXUJrfA4iLJthAGKz5zorEx6ttrxalhLl77CJ2c5Q",
                    "mode": "id"
                },
                "sheetName": {
                    "__rl": True,
                    "value": "Sheet1",
                    "mode": "name"
                },
                "columns": {
                    "mappingMode": "defineBelow",
                    "value": columns_value
                },
                "options": {
                    "continueOnFail": True
                }
            }
            
            print("Fixed configuration:")
            print(json.dumps(node['parameters'], indent=2))
    
    cursor.execute('UPDATE workflow_entity SET nodes = ? WHERE id = ?', 
                   (json.dumps(nodes), workflow_id))
    
    version_id = str(uuid.uuid4())
    cursor.execute('''
        UPDATE workflow_entity 
        SET versionId = ?, activeVersionId = ?, updatedAt = datetime('now')
        WHERE id = ?
    ''', (version_id, version_id, workflow_id))
    
    cursor.execute('DELETE FROM workflow_published_version WHERE workflowId=?', (workflow_id,))
    cursor.execute('''
        INSERT INTO workflow_published_version (workflowId, publishedVersionId, createdAt, updatedAt)
        VALUES (?, ?, datetime('now'), datetime('now'))
    ''', (workflow_id, version_id))
    
    conn.commit()
    print(f"\n[OK] Google Sheets node fixed! New version: {version_id}")
    print("\nYou must restart n8n for changes to take effect.")

conn.close()
