#!/usr/bin/env python
"""Test PostgreSQL connection."""
import psycopg2

try:
    conn = psycopg2.connect(
        dbname='optibiz',
        user='postgres',
        password='Nebula@2020',
        host='localhost',
        port=5432
    )
    print('✓ Connected to PostgreSQL successfully!')
    cursor = conn.cursor()
    cursor.execute('SELECT version();')
    db_version = cursor.fetchone()
    print(f'Database version: {db_version[0]}')
    cursor.close()
    conn.close()
except psycopg2.OperationalError as e:
    print(f'✗ Connection failed: {e}')
except Exception as e:
    print(f'✗ Error: {e}')
