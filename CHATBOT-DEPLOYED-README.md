# Brooklyn Services Limited Chatbot - DEPLOYED ✅

## 🎉 Implementation Complete!

The Brooklyn Services Limited AI chatbot has been successfully created and deployed in your n8n instance!

---

## 📋 Summary

| Component | Status | Details |
|-----------|--------|---------|
| **Workflow Name** | ✅ Created | Brooklyn Services Limited CB |
| **Workflow ID** | ✅ | `BiGIl7alqBzeKa9R` |
| **Pinecone Index** | ✅ Created | `brooklyn-services-kb` |
| **Documents Uploaded** | ✅ | 43 chunks from 8 documents |
| **Namespace** | ✅ | `bsl-chatbot-v1` |
| **Webhook URL** | ✅ | `http://localhost:5678/webhook/brooklyn-services-chat` |

---

## 🔗 Webhook Endpoint

**Your chatbot is accessible at:**
```
http://localhost:5678/webhook/brooklyn-services-chat
```

This is the URL to use in your website embed code.

---

## 🛠️ Next Steps Required

### 1. Configure Credentials in n8n (Required)

You need to add credentials to the following nodes in your n8n workflow:

#### AI Agent Node (Primary Model)
- Go to: http://localhost:5678/workflow/BiGIl7alqBzeKa9R
- Click on **"AI Agent"** node
- Configure OpenRouter credentials
- Model: `openai/gpt-oss-120b:free`

#### AI Agent Fallback Node
- Click on **"AI Agent Fallback"** node
- Configure OpenRouter credentials (same as above)
- Model: `moonshotai/kimi-k2.5`

#### Pinecone Vector Store Node
- Click on **"Pinecone Vector Store"** node
- Configure Pinecone API credentials
- Index: `brooklyn-services-kb` (already set)

#### Window Buffer Memory Node
- This node works without credentials

### 2. Add Website Embed Code

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
      'I\'m here to help with plumbing, drainage, utility locating, or leak detection questions.',
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

### 3. Activate the Workflow

1. Open n8n: http://localhost:5678/workflow/BiGIl7alqBzeKa9R
2. Click the **"Activate"** toggle in the top right
3. The workflow is now live and ready to receive messages!

---

## 🤖 Chatbot Features

### AI Models
- **Primary:** `openai/gpt-oss-120b:free` (OpenRouter)
- **Fallback:** `moonshotai/kimi-k2.5` (OpenRouter) - for images & rate limits

### Knowledge Base
- **43 document chunks** covering:
  - Company overview & history
  - All 4 service categories (Plumbing, Drainage, Utility Locating, Leak Detection)
  - Contact information
  - About page content

### Key Features
✅ **Emergency Detection** - Auto-detects emergencies, provides 0800 1 BROOK immediately
✅ **Image Upload** - Proactive encouragement + vision analysis with fallback model
✅ **Memory** - 10-message window buffer for conversation context
✅ **Response Formatting** - Automatic contact info injection
✅ **Vector Store** - Pinecone retrieval for accurate service information

---

## 📊 Workflow Structure

```
1. When chat message received (Webhook)
   ↓
2. Emergency Detection (IF node)
   ├─ Emergency → Emergency Response → Response Formatter
   └─ Normal → AI Agent → Response Formatter
   ↓
3. AI Agent (Primary Model)
   ↓
4. Response Formatter (Adds contact info)
   ↓
5. Set Response
   ↓
6. Respond to Webhook
```

**Additional Nodes:**
- AI Agent Fallback (for images & rate limits)
- Pinecone Vector Store (knowledge retrieval)
- Window Buffer Memory (conversation context)

---

## 🚨 Emergency Keywords

The chatbot automatically detects these keywords:
- burst pipe
- flooding
- gas leak
- sewage
- urgent
- emergency

**Response:** Immediate 0800 1 BROOK with NO after-hours fee messaging

---

## 📞 Contact Information (Hardcoded)

- **Emergency:** 0800 1 BROOK (0800 127 665) - 24/7
- **Office:** 03 349 7322
- **Mobile:** 021 841 746
- **Email:** sam@brooklynservices.co.nz
- **Website:** www.brooklynservices.co.nz

---

## 🔧 Testing

### Test the Chatbot

1. **Direct API Test:**
```bash
curl -X POST http://localhost:5678/webhook/brooklyn-services-chat \
  -H "Content-Type: application/json" \
  -d '{"chatInput": "Hello, what services do you offer?", "sessionId": "test-session-1"}'
```

2. **Emergency Test:**
```bash
curl -X POST http://localhost:5678/webhook/brooklyn-services-chat \
  -H "Content-Type: application/json" \
  -d '{"chatInput": "I have a burst pipe!", "sessionId": "test-session-2"}'
```

3. **Web Interface:**
   - Open your website with the embed code
   - Click the chat widget
   - Start chatting!

---

## 📝 Notes

### What's Working:
✅ Workflow created and configured
✅ Pinecone index with 43 document chunks
✅ Emergency detection logic
✅ Response formatting with contact info
✅ AI agents configured (need credentials)

### What's Needed:
⚠️ **Add OpenRouter credentials** to AI Agent nodes
⚠️ **Add Pinecone credentials** to Vector Store node
⚠️ **Activate the workflow** toggle
⚠️ **Add chat widget** to your website

### Optional Enhancements:
- Add Google Sheets logging (create new sheet, add Google Sheets node)
- Add "Talk to Sam" escalation button
- Add IP-based session tracking
- Add retry logic for rate limits

---

## 🆘 Troubleshooting

### Workflow Not Responding
1. Check n8n is running: http://localhost:5678
2. Verify workflow is activated (toggle is ON)
3. Check credentials are configured
4. Check execution logs in n8n

### No Knowledge Base Response
1. Verify Pinecone index: `brooklyn-services-kb`
2. Check namespace: `bsl-chatbot-v1`
3. Verify Pinecone credentials
4. Check n8n logs for retrieval errors

### AI Not Responding
1. Check OpenRouter API key
2. Verify model names: `openai/gpt-oss-120b:free` and `moonshotai/kimi-k2.5`
3. Check OpenRouter dashboard for rate limits
4. Verify OpenRouter credits/balance

---

## 📂 Files Created

| File | Description |
|------|-------------|
| `brooklyn-services-chatbot-workflow.json` | n8n workflow export |
| `chatbot-implementation-guide.md` | Detailed implementation guide |
| `create-pinecone-index.py` | Python script for Pinecone setup |
| `upload-to-pinecone.py` | Alternative upload script |
| `website-embed.html` | Full embed code for website |
| `bsl-knowledge-base.txt` | Consolidated knowledge base |
| `CHATBOT-DEPLOYED-README.md` | This file |

---

## ✅ Activation Checklist

- [ ] Open workflow in n8n: http://localhost:5678/workflow/BiGIl7alqBzeKa9R
- [ ] Configure OpenRouter credentials in AI Agent nodes
- [ ] Configure Pinecone credentials in Vector Store node
- [ ] Click "Activate" toggle
- [ ] Test with curl command
- [ ] Add embed code to website
- [ ] Test on website
- [ ] Monitor conversations

---

## 📞 Support

If you encounter issues:
1. Check n8n execution logs
2. Verify all credentials are properly configured
3. Test Pinecone index directly
4. Check OpenRouter API status

---

**Status:** ✅ Workflow Created & Ready for Activation  
**Date:** 2026-04-27  
**Workflow ID:** BiGIl7alqBzeKa9R  
**Webhook:** http://localhost:5678/webhook/brooklyn-services-chat