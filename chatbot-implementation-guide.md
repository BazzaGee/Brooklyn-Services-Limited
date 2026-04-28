# Brooklyn Services Limited Chatbot - Implementation Guide

## Overview
This guide will walk you through implementing the Brooklyn Services Limited chatbot in your n8n instance.

## Prerequisites
- n8n running locally (http://localhost:5678)
- OpenRouter API credentials configured
- Pinecone API credentials configured
- OpenAI API credentials configured (for embeddings)
- Google Sheets API credentials configured

## Step 1: Create Pinecone Index

### Option A: Using Pinecone Console
1. Log into Pinecone Console: https://app.pinecone.io
2. Click "Create Index"
3. Configure:
   - **Index Name:** `brooklyn-services-kb`
   - **Dimension:** 1536
   - **Metric:** Cosine
   - **Pod Type:** Starter (or your preferred tier)
4. Click "Create Index"

### Option B: Using Python Script
```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="your-api-key")

pc.create_index(
    name="brooklyn-services-kb",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)
```

## Step 2: Upload Documents to Pinecone

Use the provided Python script or n8n workflow to upload the consolidated knowledge base:

```python
from pinecone import Pinecone
from openai import OpenAI
import json

# Initialize clients
pc = Pinecone(api_key="your-pinecone-api-key")
openai_client = OpenAI(api_key="your-openai-api-key")

index = pc.Index("brooklyn-services-kb")

# Read and chunk the knowledge base
with open('/tmp/bsl-knowledge-base.txt', 'r') as f:
    content = f.read()

# Split into chunks (adjust chunk size as needed)
chunks = []
chunk_size = 1000
for i in range(0, len(content), chunk_size):
    chunks.append(content[i:i+chunk_size])

# Generate embeddings and upload
for i, chunk in enumerate(chunks):
    embedding = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=chunk
    ).data[0].embedding
    
    index.upsert(
        vectors=[{
            'id': f'bsl-chunk-{i}',
            'values': embedding,
            'metadata': {
                'text': chunk,
                'source': 'brooklyn-services-knowledge-base',
                'chunk_index': i
            }
        }],
        namespace='bsl-chatbot-v1'
    )

print(f"Uploaded {len(chunks)} chunks to Pinecone")
```

## Step 3: Import Workflow into n8n

1. Open n8n: http://localhost:5678
2. Go to Workflows → Import from File
3. Select: `brooklyn-services-chatbot-workflow.json`
4. Review and save the workflow

## Step 4: Configure Credentials

### OpenRouter Credentials
1. In n8n, go to Settings → Credentials
2. Create new "OpenRouter API" credential:
   - **API Key:** Your OpenRouter API key
   - **Name:** "OpenRouter API - Brooklyn Services"

### Pinecone Credentials
1. Create new "Pinecone API" credential:
   - **API Key:** Your Pinecone API key
   - **Environment:** (leave as default)

### OpenAI Credentials
1. Create new "OpenAI API" credential:
   - **API Key:** Your OpenAI API key
   - **Name:** "OpenAI API - Embeddings"

### Google Sheets Credentials
1. Create new "Google Sheets OAuth2" credential:
   - Follow OAuth2 setup process
   - Name: "Google Sheets - Brooklyn Services"

## Step 5: Create Google Sheet

1. Create a new Google Sheet: "Brooklyn Services Chatbot Logs"
2. Create first sheet tab: "Chat Logs"
3. Add headers (Row 1):
   - A: Timestamp
   - B: Session ID
   - C: User IP
   - D: User Message
   - E: Bot Response
   - F: Model Used
   - G: Image Uploaded
   - H: Emergency Flag
   - I: Quote Intent
   - J: Service Interest
   - K: Escalation Triggered
   - L: Callback Requested
   - M: User Name
   - N: User Phone
   - O: Best Time
   - P: Issue Summary
   - Q: Conversation Length
   - R: Response Time

4. Share the sheet with your Google Sheets service account email
5. Copy the Sheet ID from the URL

## Step 6: Configure Environment Variables

Add to your n8n environment:

```bash
GOOGLE_SHEETS_BSL_CHATBOT_ID=your-sheet-id-here
GOOGLE_SHEETS_BSL_SHEET_NAME=Chat Logs
```

Or configure in n8n settings.

## Step 7: Update Workflow Credentials

1. Open the imported workflow
2. Click on each credential node
3. Select the appropriate credentials created in Step 4

## Step 8: Test the Workflow

1. Save the workflow
2. Click "Test Workflow"
3. Send a test message via the webhook URL
4. Check:
   - Response is generated
   - Google Sheets logging works
   - No errors in execution

## Step 9: Add Chat Widget to Website

Add this code to your website (http://localhost:4324):

```html
<!-- Brooklyn Services Limited Chat Widget -->
<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
  
  createChat({
    webhookUrl: 'http://localhost:5678/webhook/brooklyn-services-chat',
    mode: 'window',
    showWelcomeScreen: true,
    initialMessages: [
      'Kia ora! Welcome to Brooklyn Services Limited. 👋',
      'I'm here to help with plumbing, drainage, utility locating, or leak detection questions.',
      'How can I assist you today?'
    ],
    i18n: {
      en: {
        title: 'Brooklyn Services Assistant',
        subtitle: 'Ask about plumbing, drainage, leaks, or utility locating',
        footer: '0800 1 BROOK | sam@brooklynservices.co.nz',
        getStarted: 'Start Chat',
        inputPlaceholder: 'Type your message or upload a photo...',
        fileUploadPlaceholder: 'Upload a photo of the issue...'
      }
    },
    allowFileUploads: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxFileSize: 5242880,
    styling: {
      primaryColor: '#dc2626',
      position: 'bottom-right',
      height: 600,
      width: 380
    }
  });
</script>
```

## Step 10: Activate Workflow

1. Toggle workflow to "Active"
2. Test on your website
3. Monitor Google Sheets for logs

## Features Implemented

✅ Primary Model: openai/gpt-oss-120b:free
✅ Fallback Model: moonshotai/kimi-k2.5 (vision + rate limit)
✅ Retry Logic: 2 attempts with 2-second delay
✅ Image Upload: Proactive encouragement + vision analysis
✅ Emergency Detection: 10 keywords with immediate response
✅ Talk to Sam: Escalation button with callback options
✅ IP Tracking: Session-based with 30-day persistence
✅ Google Sheets Logging: Complete conversation tracking
✅ Pinecone Vector Store: Brooklyn Services knowledge base
✅ Contact Info Injection: Automatic in responses

## Troubleshooting

### Model Not Responding
- Check OpenRouter credentials
- Verify API key has access to both models
- Check rate limits

### Pinecone Connection Issues
- Verify index name: `brooklyn-services-kb`
- Check namespace: `bsl-chatbot-v1`
- Confirm API key permissions

### Google Sheets Not Logging
- Check Sheet ID is correct
- Verify service account has access
- Ensure column headers match

### Chat Widget Not Loading
- Verify webhook URL
- Check CORS settings
- Ensure workflow is active

## Support

For issues with implementation, check:
1. n8n execution logs
2. Google Sheets API quotas
3. OpenRouter rate limits
4. Pinecone index status

## Next Steps

1. Monitor conversations in Google Sheets
2. Refine responses based on user interactions
3. Add more documents to Pinecone as needed
4. Adjust system prompt based on performance
5. Consider adding more service-specific workflows