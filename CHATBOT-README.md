# Brooklyn Services Limited Chatbot - Implementation Package

## 📦 Package Contents

This package contains everything needed to implement the Brooklyn Services Limited AI chatbot:

| File | Purpose |
|------|---------|
| `brooklyn-services-chatbot-workflow.json` | n8n workflow configuration (import this) |
| `chatbot-implementation-guide.md` | Step-by-step implementation instructions |
| `upload-to-pinecone.py` | Python script to upload documents to Pinecone |
| `website-embed.html` | Chat widget code for your website |
| `bsl-knowledge-base.txt` | Consolidated knowledge base document |
| `CHATBOT-README.md` | This file - overview and quick start |

---

## 🚀 Quick Start (5 Steps)

### Step 1: Create Pinecone Index
**Option A - Pinecone Console (Recommended):**
1. Go to https://app.pinecone.io
2. Create index: `brooklyn-services-kb`
3. Dimension: `1536`, Metric: `Cosine`

**Option B - Python Script:**
```bash
python upload-to-pinecone.py --pinecone-key YOUR_KEY --openai-key YOUR_KEY
```

### Step 2: Import Workflow to n8n
1. Open n8n: http://localhost:5678
2. Workflows → Import from File
3. Select: `brooklyn-services-chatbot-workflow.json`

### Step 3: Configure Credentials
In n8n, create these credentials:
- **OpenRouter API** - For AI models
- **Pinecone API** - For knowledge base
- **OpenAI API** - For embeddings
- **Google Sheets OAuth2** - For logging

### Step 4: Create Google Sheet
1. Create new Google Sheet: "Brooklyn Services Chatbot Logs"
2. Add headers (see implementation guide)
3. Copy Sheet ID
4. Configure in workflow

### Step 5: Add to Website
Add this to your website's HTML:

```html
<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
  
  createChat({
    webhookUrl: 'http://localhost:5678/webhook/brooklyn-services-chat',
    // ... see website-embed.html for full config
  });
</script>
```

---

## ✨ Chatbot Features

### AI Models
- **Primary:** `openai/gpt-oss-120b:free` via OpenRouter
- **Fallback:** `moonshotai/kimi-k2.5` via OpenRouter (vision + rate limit backup)
- **Retry Logic:** 2 attempts with 2-second delay

### Knowledge Base
- **Vector Store:** Pinecone (`brooklyn-services-kb`)
- **Documents:** 10 files covering all BSL services
- **Namespace:** `bsl-chatbot-v1`

### Key Capabilities

#### 1. Emergency Detection
- Auto-detects: burst pipe, flooding, gas leak, sewage, urgent, emergency
- **Immediate Response:** 0800 1 BROOK with NO after-hours fee message
- Logged to Google Sheets with emergency flag

#### 2. Image Upload & Vision Analysis
- Encourages photo uploads for physical issues
- Uses kimi-k2.5 for image analysis
- General observations (NOT diagnosis)
- Recommends professional inspection

#### 3. "Talk to Sam" Escalation
- Persistent button in chat interface
- Provides Sam's mobile: 021 841 746
- Offers callback collection form
- Tracks escalations in Google Sheets

#### 4. IP-Based Session Tracking
- 30-day conversation persistence
- Tracks user preferences and history
- Identifies returning users

#### 5. Google Sheets Logging
Comprehensive logging of:
- Timestamp, Session ID, IP Address
- User messages & bot responses
- Model used, emergency flags
- Escalation & callback requests
- Service interest tracking

---

## 🎯 Business Focus

This chatbot is specifically designed for **Brooklyn Services Limited** and emphasizes:

### Key Differentiators Always Mentioned:
- ✅ NO after-hours call-out fee (extremely rare)
- ✅ 50+ years combined team experience
- ✅ Rinnai & Electrolux authorized agents
- ✅ 24/7 emergency service
- ✅ Licensed plumbers & drainlayers

### Services Promoted:
1. **Plumbing** - Residential/commercial, hot water, renovations
2. **Drainage** - Blocked drains, CCTV, septic systems
3. **Utility Locating** - GPR, electromagnetic, service mapping
4. **Leak Detection** - Acoustic, thermal imaging

### Primary Goal:
**Convert website visitors into customers** by:
- Providing helpful information
- Making contact easy (0800 1 BROOK)
- Emphasizing unique selling points
- Encouraging free quotes
- Never giving specific pricing

---

## 📊 Monitoring & Analytics

### Google Sheets Columns
- A: Timestamp
- B: Session ID
- C: User IP
- D: User Message
- E: Bot Response
- F: Model Used
- G: Image Uploaded (Yes/No)
- H: Emergency Flag (Yes/No)
- I: Quote Intent (Yes/No)
- J: Service Interest
- K: Escalation Triggered
- L: Callback Requested
- M-P: User details for callbacks
- Q: Conversation Length
- R: Response Time

### Key Metrics to Monitor:
- Emergency detection accuracy
- Image upload rate
- Escalation rate
- Service category interest
- Quote intent detection
- Callback requests

---

## 🔧 Customization

### Change Welcome Message
Edit in workflow: `When chat message received` node → Options → Welcome Message

### Update Contact Information
Current values:
- Emergency: 0800 1 BROOK (0800 127 665)
- Office: 03 349 7322
- Mobile: 021 841 746
- Email: sam@brooklynservices.co.nz

### Add More Documents
1. Create Markdown file with new content
2. Run `upload-to-pinecone.py` again
3. New content will be available immediately

### Change AI Models
Edit AI Agent nodes:
- Model: `openai/gpt-oss-120b:free` (primary)
- Fallback: `moonshotai/kimi-k2.5` (fallback/vision)

---

## 🆘 Troubleshooting

### Model Not Responding
- Check OpenRouter API key
- Verify model access on OpenRouter
- Check rate limits

### Pinecone Connection Issues
- Verify index name: `brooklyn-services-kb`
- Check namespace: `bsl-chatbot-v1`
- Confirm API key permissions

### Google Sheets Not Logging
- Check Sheet ID is correct
- Verify service account access
- Ensure column headers match

### Chat Widget Not Loading
- Check webhook URL
- Verify CORS settings
- Ensure workflow is active

---

## 📞 Support

For implementation issues:
1. Check n8n execution logs
2. Verify all credentials are configured
3. Test individual nodes
4. Review Google Sheets API quotas

---

## ✅ Implementation Checklist

- [ ] Pinecone index created (`brooklyn-services-kb`)
- [ ] Documents uploaded to Pinecone
- [ ] n8n workflow imported
- [ ] OpenRouter credentials configured
- [ ] Pinecone credentials configured
- [ ] OpenAI credentials configured
- [ ] Google Sheet created and shared
- [ ] Google Sheets credentials configured
- [ ] Workflow activated
- [ ] Chat widget added to website
- [ ] Test messages sent
- [ ] Google Sheets logging verified

---

## 📅 Next Steps

1. **Monitor** conversations via Google Sheets
2. **Refine** responses based on user interactions
3. **Add** more documents to Pinecone as needed
4. **Adjust** system prompt based on performance
5. **Consider** adding more advanced features (booking integration, etc.)

---

**Created:** 2026-04-27  
**Version:** 1.0  
**Status:** Ready for Implementation