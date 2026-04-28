#!/usr/bin/env python3
"""
Create Pinecone index and upload Brooklyn Services documents
"""

import os
import sys

# Set UTF-8 encoding for Windows
sys.stdout.reconfigure(encoding='utf-8')

from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI

# Configuration
PINECONE_API_KEY = "pcsk_4XeQBN_7bDQC7wRz2ceBh5szWXqipKBbe2uN1BYeMMT2fL4zpEQz6kr1DAtWPW8ABW3Rb1"
OPENAI_API_KEY = "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"
INDEX_NAME = "brooklyn-services-kb"

def chunk_text(text, chunk_size=1500, overlap=200):
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        # Try to end at a sentence or paragraph boundary
        if end < len(text):
            for i in range(end, max(end-100, start), -1):
                if text[i-1:i+1] in ['. ', '! ', '? ', '\n\n']:
                    end = i
                    break
        chunks.append(text[start:end])
        start = end - overlap if end < len(text) else end
    return chunks

def create_index(pc, index_name):
    """Create Pinecone index if it doesn't exist."""
    try:
        existing_indexes = pc.list_indexes()
        if index_name in [idx.name for idx in existing_indexes.indexes]:
            print(f"[OK] Index '{index_name}' already exists")
            return True
        
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
        print(f"[OK] Created new index: {index_name}")
        return True
    except Exception as e:
        print(f"[ERROR] Error creating index: {e}")
        return False

def upload_documents():
    """Upload documents to Pinecone."""
    print("\n=== Brooklyn Services Limited - Pinecone Setup ===\n")
    
    print("Initializing Pinecone and OpenAI clients...")
    pc = Pinecone(api_key=PINECONE_API_KEY)
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    print("[OK] Clients initialized\n")
    
    if not create_index(pc, INDEX_NAME):
        return False
    
    index = pc.Index(INDEX_NAME)
    
    documents = [
        ("website-scrape/1-COMPANY-OVERVIEW.md", "company"),
        ("website-scrape/2-SERVICES-DETAILED.md", "services"),
        ("content/services/plumbing.md", "plumbing"),
        ("content/services/drainage.md", "drainage"),
        ("content/services/leak-detection.md", "leak-detection"),
        ("content/services/utility-locating.md", "utility-locating"),
        ("content/pages/contact.md", "contact"),
        ("content/pages/about.md", "about"),
    ]
    
    total_chunks = 0
    
    for doc_path, category in documents:
        try:
            print(f"Processing {doc_path}...")
            
            with open(doc_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            chunks = chunk_text(content)
            print(f"  Processing {len(chunks)} chunks")
            
            # Upload in batches
            batch_size = 10
            for batch_start in range(0, len(chunks), batch_size):
                batch_end = min(batch_start + batch_size, len(chunks))
                batch = chunks[batch_start:batch_end]
                
                vectors = []
                for i, chunk in enumerate(batch):
                    chunk_index = batch_start + i
                    
                    response = openai_client.embeddings.create(
                        model="text-embedding-3-small",
                        input=chunk
                    )
                    embedding = response.data[0].embedding
                    
                    vectors.append({
                        'id': f'bsl-{category}-{chunk_index}',
                        'values': embedding,
                        'metadata': {
                            'text': chunk,
                            'source': doc_path,
                            'category': category,
                            'chunk_index': chunk_index
                        }
                    })
                    total_chunks += 1
                
                index.upsert(
                    vectors=vectors,
                    namespace='bsl-chatbot-v1'
                )
            
            print(f"  [OK] Uploaded {len(chunks)} chunks from {doc_path}\n")
            
        except Exception as e:
            print(f"  [ERROR] Error processing {doc_path}: {e}\n")
    
    stats = index.describe_index_stats()
    print(f"\n=== Upload Complete ===")
    print(f"[OK] Total chunks uploaded: {total_chunks}")
    print(f"[OK] Index: {INDEX_NAME}")
    print(f"[OK] Namespace: bsl-chatbot-v1")
    print(f"[OK] Total vectors in index: {stats.total_vector_count}")
    print(f"\nPinecone setup complete!\n")
    
    return True

if __name__ == "__main__":
    success = upload_documents()
    exit(0 if success else 1)