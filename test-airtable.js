// Test Airtable Connection
const fs = require('fs')
const path = require('path')

// Read .env.local file
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')

// Parse environment variables
const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#][^=]*)=(.*)$/)
  if (match) {
    env[match[1].trim()] = match[2].trim()
  }
})

const AIRTABLE_API_KEY = env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID

console.log('🔍 Testing Airtable Connection...\n')
console.log('API Key:', AIRTABLE_API_KEY ? `${AIRTABLE_API_KEY.substring(0, 15)}...` : 'NOT FOUND')
console.log('Base ID:', AIRTABLE_BASE_ID || 'NOT FOUND')
console.log('')

async function testConnection() {
  const AIRTABLE_API_URL = 'https://api.airtable.com/v0'
  const tableName = 'Leads'

  try {
    console.log(`📡 Attempting to connect to ${tableName} table...\n`)

    const response = await fetch(`${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${tableName}?maxRecords=1`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('❌ Connection failed!')
      console.error('Status:', response.status, response.statusText)
      console.error('Error:', error)

      if (response.status === 401) {
        console.log('\n💡 Tip: Check if your API token is correct')
      } else if (response.status === 404) {
        console.log('\n💡 Tip: Check if:')
        console.log('   - Base ID is correct')
        console.log('   - Table name is exactly "Leads" (case-sensitive)')
        console.log('   - Token has access to this base')
      }
      return
    }

    const data = await response.json()

    console.log('✅ SUCCESS! Connected to Airtable!')
    console.log(`\n📊 Found ${data.records.length} record(s) in ${tableName} table`)

    if (data.records.length > 0) {
      const record = data.records[0]
      console.log('\n📝 Sample Record:')
      console.log('   Record ID:', record.id)
      console.log('   Fields:', Object.keys(record.fields).slice(0, 5).join(', '), '...')
    } else {
      console.log('\n💡 Table is empty - this is normal for a new setup')
    }

    console.log('\n🎉 Your Airtable integration is working!')
    console.log('✅ You can now submit the quote form on your website.')
    console.log('✅ Visit: http://localhost:3000')

  } catch (error) {
    console.error('❌ Network Error:', error.message)
    console.log('\n💡 Tip: Check your internet connection')
  }
}

testConnection()
