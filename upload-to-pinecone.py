#!/usr/bin/env python3
"""
Upload Brooklyn Services Limited documents to Pinecone
Run: python upload-to-pinecone.py --pinecone-key YOUR_KEY --openai-key YOUR_KEY
"""

import argparse
import os
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI


def chunk_text(text, chunk_size=1000, overlap=200):
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start = end - overlap if end < len(text) else end
    return chunks


def create_index(pc, index_name):
    """Create Pinecone index if it doesn't exist."""
    try:
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
        print(f"Created new index: {index_name}")
    except Exception as e:
        if "already exists" in str(e).lower():
            print(f"Index {index_name} already exists")
        else:
            raise e


def upload_documents(pinecone_key, openai_key, index_name="brooklyn-services-kb"):
    """Upload documents to Pinecone."""
    # Initialize clients
    pc = Pinecone(api_key=pinecone_key)
    openai_client = OpenAI(api_key=openai_key)
    
    # Create index
    create_index(pc, index_name)
    index = pc.Index(index_name)
    
    # Read documents
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
            with open(doc_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Split into chunks
            chunks = chunk_text(content)
            
            print(f"Processing {doc_path}: {len(chunks)} chunks")
            
            # Generate embeddings and upload
            for i, chunk in enumerate(chunks):
                # Generate embedding
                response = openai_client.embeddings.create(
                    model="text-embedding-3-small",
                    input=chunk
                )
                embedding = response.data[0].embedding
                
                # Upload to Pinecone
                index.upsert(
                    vectors=[{
                        'id': f'bsl-{category}-{i}',
                        'values': embedding,
                        'metadata': {
                            'text': chunk,
                            'source': doc_path,
                            'category': category,
                            'chunk_index': i
                        }
                    }],
                    namespace='bsl-chatbot-v1'
                )
                
                total_chunks += 1
                
            print(f"  ✓ Uploaded {len(chunks)} chunks from {doc_path}")
            
        except Exception as e:
            print(f"  ✗ Error processing {doc_path}: {e}")
    
    print(f"\n✓ Total chunks uploaded: {total_chunks}")
    print(f"✓ Index: {index_name}")
    print(f"✓ Namespace: bsl-chatbot-v1")


def main():
    parser = argparse.ArgumentParser(description='Upload Brooklyn Services documents to Pinecone')
    parser.add_argument('--pinecone-key', required=True, help='Pinecone API key')
    parser.add_argument('--openai-key', required=True, help='OpenAI API key')
    parser.add_argument('--index-name', default='brooklyn-services-kb', help='Pinecone index name')
    
    args = parser.parse_args()
    
    upload_documents(args.pinecone_key, args.openai_key, args.index_name)


if __name__ == "__main__":
    main()