// Test Quote Submission with Dummy Data
console.log('🧪 Testing Quote Form Submission with Dummy Data\n')
console.log('=' .repeat(60))

const dummyQuoteData = {
  // Step 1 - Business Info
  companyType: 'hotel',
  companyName: 'Grand Plaza Hotel Mumbai',
  facilitySize: 'Large (150-500 staff)',
  hasCurrentSupplier: true,
  currentSupplierName: 'UniForm India',
  timeline: 'urgent',

  // Step 2 - Requirements
  departments: ['Front of House', 'Kitchen & Service', 'Housekeeping'],
  totalQuantity: '200-500 pieces',
  customizationNeeds: {
    logo: true,
    embroidery: true,
    colorMatch: false
  },

  // Step 3 - Contact
  name: 'Rahul Sharma',
  title: 'Procurement Manager',
  email: 'rahul.sharma@grandplaza.com',
  phone: '+91 98765 43210',
  budgetRange: '5-10L',
  preferredContact: 'email',
  marketingOptIn: true
}

console.log('📋 Test Data:')
console.log(JSON.stringify(dummyQuoteData, null, 2))
console.log('\n' + '=' .repeat(60))

async function testSubmission() {
  try {
    console.log('\n📡 Sending POST request to /api/quote...\n')

    const response = await fetch('http://localhost:3000/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dummyQuoteData)
    })

    console.log('📊 Response Status:', response.status, response.statusText)

    const result = await response.json()

    console.log('\n📦 Response Data:')
    console.log(JSON.stringify(result, null, 2))

    if (result.success) {
      console.log('\n' + '=' .repeat(60))
      console.log('✅ SUCCESS! Quote submitted successfully!')
      console.log('=' .repeat(60))
      console.log('\n📝 Record Details:')
      console.log('   Record ID:', result.recordId)
      console.log('   Message:', result.message)
      console.log('\n🎯 Next Steps:')
      console.log('   1. Open your Airtable base')
      console.log('   2. Go to the "Leads" table')
      console.log('   3. You should see a new record for "Grand Plaza Hotel Mumbai"')
      console.log('\n🌐 Airtable Base URL:')
      console.log('   https://airtable.com/appteHbWjuWHeAWgf')
    } else {
      console.log('\n' + '=' .repeat(60))
      console.log('❌ FAILED! Quote submission failed')
      console.log('=' .repeat(60))
      console.log('\nError:', result.error)
      console.log('\n💡 Troubleshooting:')

      if (result.error.includes('Configuration')) {
        console.log('   - Check .env.local file exists')
        console.log('   - Verify AIRTABLE_API_KEY and AIRTABLE_BASE_ID are set')
      } else if (result.error.includes('save lead')) {
        console.log('   - Check Airtable "Leads" table exists')
        console.log('   - Verify API token has write permissions')
        console.log('   - Check table field names match')
      }
    }

  } catch (error) {
    console.log('\n' + '=' .repeat(60))
    console.log('❌ ERROR! Request failed')
    console.log('=' .repeat(60))
    console.log('\nError:', error.message)
    console.log('\n💡 Common Issues:')
    console.log('   - Dev server not running? Run: npm run dev')
    console.log('   - Wrong port? Check if server is on http://localhost:3000')
  }
}

testSubmission()
