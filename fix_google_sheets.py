#!/usr/bin/env python3
"""Fix Google Sheets node configuration in n8n workflow"""

import sqlite3
import json
import uuid

def fix_google_sheets_node():
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
                
                # Update the node configuration
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
                        "mappingMode": "autoMap",
                        "matchingColumns": [],
                        "schema": []
                    },
                    "options": {
                        "continueOnFail": True
                    }
                }
                
                print("Fixed Google Sheets node configuration")
        
        # Update workflow
        cursor.execute('UPDATE workflow_entity SET nodes = ? WHERE id = ?', 
                   (json.dumps(nodes), workflow_id))
        
        # Create new version
        version_id = str(uuid.uuid4())
        cursor.execute('''
            UPDATE workflow_entity 
            SET versionId = ?, activeVersionId = ?, updatedAt = datetime('now')
            WHERE id = ?
        ''', (version_id, version_id, workflow_id))
        
        # Update published version
        cursor.execute('DELETE FROM workflow_published_version WHERE workflowId=?', (workflow_id,))
        cursor.execute('''\n            INSERT INTO workflow_published_version (workflowId, publishedVersionId, createdAt, updatedAt)
            VALUES (?, ?, datetime('now'), datetime('now'))
        ''', (workflow_id, version_id))
        
        conn.commit()
        print(f"[OK] Workflow updated to version {version_id}")
    
    conn.close()

if __name__ == "__main__":
    fix_google_sheets_node()
