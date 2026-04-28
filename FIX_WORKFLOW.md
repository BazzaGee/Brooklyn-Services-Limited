# Brooklyn Services Chatbot - WORKFLOW FIX GUIDE

## 🔧 AUTO-FIX INSTRUCTIONS

Since the n8n API requires authentication, here is the complete fix process:

### **METHOD 1: Import Fresh Workflow (Recommended)**

1. **Open n8n**: http://localhost:5678

2. **Delete old workflow** (if exists):
   - Look for "Brooklyn Services Limited CB"
   - Click the trash icon to delete

3. **Import new workflow**:
   - Go to **Workflows** → **Import from File**
   - Select: `brooklyn-services-chatbot-v2.json`
   - Click **Import**

4. **Configure credentials** (one-time setup):
   - OpenRouter Primary → Select OpenRouter credentials
   - OpenRouter Fallback → Select OpenRouter credentials
   - VS Docs → Select Pinecone credentials
   - Embeddings OpenAI → Select OpenAI credentials
   - Web Search → Select Tavily credentials

5. **Connect tool ports**:
   - Click **AI Agent** node
   - Connect:
     - ai_memory → Simple Memory
     - ai_tool → VS Docs
     - ai_tool → Web Search
     - ai_languageModel → OpenRouter Primary
     - ai_languageModel → OpenRouter Fallback

6. **Test**:
   - Click **Test Workflow**
   - Enter: "What services do you offer?"
   - Should respond with Brooklyn Services info

---

### **METHOD 2: Python Auto-Fix Script**

Run this script to automatically import and configure:

```bash
cd "C:\Users\barry\OneDrive\Desktop\Prospect List\Brooklyn Services Limited"
python fix-workflow.py
```

The script will:
1. Check if n8n is running
2. Import the workflow via API
3. Configure basic settings
4. Provide next steps

---

### **METHOD 3: Manual Node Fixes**

If the workflow exists but is broken, fix these nodes manually:

#### **1. Fix "When chat message received"**
- Click the node
- Ensure connection to **AI Agent**
- Settings:
  - Public: ✅ true
  - Mode: hostedChat
  - Initial Messages: "Kia ora! Welcome to Brooklyn Services Limited..."

#### **2. Fix "AI Agent" System Message**
Replace with:
```
You are a friendly, knowledgeable assistant for Brooklyn Services Limited, a Christchurch-based company specialising in plumbing, drainage, utility locating, and leak detection services.

COMPANY PROFILE:
- Founded: 2011 by Sam Aitken
- 50+ years combined team experience
- NO after-hours call-out fee (extremely rare!)
- Licensed plumbers and drainlayers
- 24/7 emergency service: 0800 1 BROOK (0800 127 665)
- Rinnai & Electrolux authorized agents (Canterbury-wide)

SERVICES:
1. Plumbing: Hot water, renovations, gas fitting, backflow, filters
2. Drainage: Blocked drains (CCTV + water blaster), septic, stormwater
3. Utility Locating: GPR, electromagnetic (South Island-wide)
4. Leak Detection: Acoustic, thermal imaging (South Island-wide)

EMERGENCY: If user mentions burst pipe, flooding, gas leak, sewage - IMMEDIATELY provide emergency number and emphasize NO after-hours fee!
```

#### **3. Fix "VS Docs" (Pinecone)**
- Index: `brooklyn-services-kb`
- Namespace: `bsl-chatbot-v1`
- Mode: retrieve-as-tool
- Top K: 5

#### **4. Fix Tool Connections**
- Simple Memory → AI Agent (ai_memory)
- VS Docs → AI Agent (ai_tool)
- Web Search → AI Agent (ai_tool)
- OpenRouter Primary → AI Agent (ai_languageModel)
- OpenRouter Fallback → AI Agent (ai_languageModel)
- Embeddings OpenAI → VS Docs (ai_embedding)

---

## ✅ VERIFICATION CHECKLIST

- [ ] Workflow imported successfully
- [ ] All credentials configured
- [ ] Tool connections established
- [ ] Test message responds correctly
- [ ] Emergency keywords trigger emergency response
- [ ] VS Docs retrieves information from Pinecone
- [ ] Chat History logs to Google Sheets (optional)

---

## 🧪 TEST COMMANDS

```bash
# Test basic query
curl -X POST http://localhost:5678/webhook/brooklyn-services-chat \
  -H "Content-Type: application/json" \
  -d '{"chatInput":"What services do you offer?","sessionId":"test-1"}'

# Test emergency
curl -X POST http://localhost:5678/webhook/brooklyn-services-chat \
  -H "Content-Type: application/json" \
  -d '{"chatInput":"I have a burst pipe!","sessionId":"test-2"}'
```

---

## 📁 FILES CREATED

1. `brooklyn-services-chatbot-v2.json` - Fixed workflow
2. `fix-workflow.py` - Python auto-import script
3. `FIX_WORKFLOW.md` - This guide

---

**Last Updated**: 2026-04-27
**Status**: Ready for import