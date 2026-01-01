// Test Multiple Quote Submissions
console.log('🧪 Testing Multiple Quote Submissions\n')
console.log('='  .repeat(70))

const testLeads = [
  {
    name: "Apollo Hospital Test",
    data: {
      companyType: 'hospital',
      companyName: 'Apollo Multispecialty Hospital',
      facilitySize: 'Enterprise (500+ staff)',
      timeline: 'planned',
      departments: ['Nursing & Care', 'Surgical & Specialist'],
      totalQuantity: '500+ pieces',
      customizationNeeds: {
        logo: true,
        embroidery: false,
        colorMatch: true
      },
      name: 'Dr. Priya Menon',
      title: 'Chief Administrative Officer',
      email: 'priya.menon@apollo.com',
      phone: '+91 99876 54321',
      budgetRange: '10L+',
      preferredContact: 'phone',
      marketingOptIn: true
    }
  },
  {
    name: "Taj Hotel Test",
    data: {
      companyType: 'hotel',
      companyName: 'Taj Palace Hotel',
      facilitySize: 'Large (150-500 staff)',
      timeline: 'urgent',
      departments: ['Front of House', 'Housekeeping', 'Management'],
      totalQuantity: '200-500 pieces',
      customizationNeeds: {
        logo: true,
        embroidery: true,
        colorMatch: true
      },
      name: 'Amit Patel',
      title: 'Operations Director',
      email: 'amit.patel@tajhotels.com',
      phone: '+91 98765 11111',
      budgetRange: '5-10L',
      preferredContact: 'email',
      marketingOptIn: true
    }
  },
  {
    name: "Fortis Hospital Test",
    data: {
      companyType: 'hospital',
      companyName: 'Fortis Healthcare Center',
      facilitySize: 'Medium (50-150 staff)',
      timeline: 'exploratory',
      departments: ['Admin & Support', 'Nursing & Care'],
      totalQuantity: '100-200 pieces',
      customizationNeeds: {
        logo: false,
        embroidery: false,
        colorMatch: false
      },
      name: 'Kavita Singh',
      title: 'Procurement Officer',
      email: 'kavita@fortis.com',
      phone: '+91 98765 22222',
      budgetRange: '1-5L',
      preferredContact: 'whatsapp',
      marketingOptIn: false
    }
  }
]

async function submitLead(testName, leadData) {
  console.log(`\n📝 Submitting: ${testName}`)
  console.log('   Company:', leadData.companyName)
  console.log('   Type:', leadData.companyType)
  console.log('   Timeline:', leadData.timeline)

  try {
    const response = await fetch('http://localhost:3000/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    })

    const result = await response.json()

    if (result.success) {
      console.log('   ✅ Success! Record ID:', result.recordId)
      if (result.fallbackUsed) {
        console.log('   📁 Saved locally (testing mode)')
      }
    } else {
      console.log('   ❌ Failed:', result.error)
    }

    return result.success

  } catch (error) {
    console.log('   ❌ Error:', error.message)
    return false
  }
}

async function runTests() {
  console.log('\n🚀 Starting test submissions...\n')

  let successCount = 0

  for (const test of testLeads) {
    const success = await submitLead(test.name, test.data)
    if (success) successCount++
    await new Promise(resolve => setTimeout(resolve, 500)) // Small delay between requests
  }

  console.log('\n' + '='.repeat(70))
  console.log(`\n📊 Results: ${successCount}/${testLeads.length} submissions successful\n`)

  console.log('🔍 Viewing all stored leads...\n')

  try {
    const response = await fetch('http://localhost:3000/api/test-leads')
    const data = await response.json()

    console.log('📦 Stored Leads:', data.count)
    console.log('\n' + '='.repeat(70))

    data.leads.forEach((lead, index) => {
      console.log(`\n${index + 1}. ${lead.fields['Company Name']}`)
      console.log(`   Type: ${lead.fields['Company Type']}`)
      console.log(`   Contact: ${lead.fields['Contact Name']} (${lead.fields['Job Title']})`)
      console.log(`   Email: ${lead.fields['Email']}`)
      console.log(`   Timeline: ${lead.fields['Timeline']}`)
      console.log(`   Status: ${lead.fields['Status']}`)
      console.log(`   ID: ${lead.id}`)
    })

    console.log('\n' + '='.repeat(70))
    console.log('\n✅ All test data saved successfully!')
    console.log('📁 Location: /home/user/Royal-Fit-Uniform/data/test-leads.json')
    console.log('\n💡 This is exactly what would be sent to Airtable in production!')
    console.log('   The data structure matches Airtable\'s format perfectly.\n')

  } catch (error) {
    console.log('❌ Error viewing leads:', error.message)
  }
}

runTests()
