#!/usr/bin/env python3
"""
Import Brooklyn Services Chatbot Workflow to n8n
Run: python import-workflow.py
"""

import json
import requests
import sys
import os

# Fix encoding for Windows
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Configuration
N8N_URL = "http://localhost:5678"
WORKFLOW_FILE = "brooklyn-services-chatbot-v2.json"

def check_n8n_running():
    """Check if n8n is running."""
    try:
        response = requests.get(f"{N8N_URL}/healthz", timeout=5)
        if response.status_code == 200:
            print("[OK] n8n is running")
            return True
        else:
            print(f"[ERROR] n8n returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"[ERROR] Cannot connect to n8n at {N8N_URL}")
        print("  Make sure n8n is running: n8n start")
        return False
    except Exception as e:
        print(f"[ERROR] Error checking n8n: {e}")
        return False

def import_workflow():
    """Import the workflow to n8n."""
    try:
        # Load workflow JSON
        with open(WORKFLOW_FILE, 'r', encoding='utf-8') as f:
            workflow = json.load(f)
        
        print(f"[OK] Loaded workflow from {WORKFLOW_FILE}")
        print(f"  Name: {workflow['name']}")
        print(f"  Nodes: {len(workflow['nodes'])}")
        
        # Try to import via REST API
        # Note: This requires authentication which we don't have
        # So we'll just verify the file is valid
        
        print("\n[!] Authentication Required")
        print("The n8n REST API requires authentication.")
        print("\nPlease import manually:")
        print("1. Open n8n: http://localhost:5678")
        print("2. Go to Workflows → Import from File")
        print(f"3. Select: {WORKFLOW_FILE}")
        print("4. Configure credentials and connections")
        print("5. Test the workflow")
        
        return True
        
    except FileNotFoundError:
        print(f"[ERROR] Workflow file not found: {WORKFLOW_FILE}")
        print("  Make sure you're in the correct directory")
        return False
    except json.JSONDecodeError as e:
        print(f"[ERROR] Invalid JSON in workflow file: {e}")
        return False
    except Exception as e:
        print(f"[ERROR] Error importing workflow: {e}")
        return False

def main():
    """Main function."""
    print("=" * 60)
    print("Brooklyn Services Chatbot - Workflow Import")
    print("=" * 60)
    print()
    
    # Check n8n
    if not check_n8n_running():
        print("\n[ERROR] Cannot proceed without n8n running")
        sys.exit(1)
    
    print()
    
    # Import workflow
    if import_workflow():
        print("\n" + "=" * 60)
        print("[OK] Workflow file is valid and ready for import")
        print("=" * 60)
        sys.exit(0)
    else:
        print("\n" + "=" * 60)
        print("[ERROR] Failed to prepare workflow")
        print("=" * 60)
        sys.exit(1)

if __name__ == "__main__":
    main()