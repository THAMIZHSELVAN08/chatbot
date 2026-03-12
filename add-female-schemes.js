const fs = require('fs');
const path = require('path');

const schemesPath = path.join(__dirname, 'src/data/schemes.json');
const schemes = JSON.parse(fs.readFileSync(schemesPath, 'utf8'));

const newSchemes = [
  {
    "id": "tn-f-001",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Free Bus Travel for Women in Tamil Nadu Cities",
    "name_local": "தமிழ்நாடு நகரங்களில் பெண்களுக்கு இலவச பேருந்து பயணம்",
    "category": "Transport",
    "gender": "Female",
    "min_age": 18,
    "max_age": 80,
    "income_limit": 1000000,
    "occupations": ["Worker", "Student", "Self-Employed", "Homemaker", "Senior Citizen", "Unemployed"],
    "eligibility": "All women (18+) in Tamil Nadu can travel free in MTC Chennai and TNSTC city buses",
    "benefit": "Completely free travel in MTC Chennai buses and TNSTC city buses. Women can board with just Aadhaar or any ID.",
    "documents": ["Any government-issued ID (Aadhaar, Voter ID, etc.)"],
    "steps": [
      "Board any MTC or TNSTC city bus",
      "Show your government-issued ID",
      "Travel free — no ticket needed"
    ],
    "link": "https://mtcbus.tn.gov.in",
    "description_en": "Tamil Nadu government provides completely free bus travel for all women in city buses including MTC Chennai — simply show ID and travel!",
    "description_local": "தமிழ்நாடு அரசு MTC சென்னை மற்றும் நகர பேருந்துகளில் அனைத்து பெண்களுக்கும் இலவச பயணம் — அடையாள சான்றை காட்டி பயணிக்கலாம்!"
  },
  {
    "id": "tn-f-002",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Kalaignar Magalir Urimai Thittam – Women Income Scheme",
    "name_local": "கலைஞர் மகளிர் உரிமைத் திட்டம் – மாதாந்திர வருமான திட்டம்",
    "category": "Women Empowerment",
    "gender": "Female",
    "min_age": 21,
    "max_age": 60,
    "income_limit": 250000,
    "occupations": ["Homemaker", "Worker", "Self-Employed", "Unemployed"],
    "eligibility": "Women above 21 years from families with annual income below Rs 2.5 lakh with ration card",
    "benefit": "Rs 1,000 per month directly transferred to woman's bank account",
    "documents": ["Aadhaar Card", "Ration Card", "Bank Passbook", "Income Certificate"],
    "steps": [
      "Visit tn.gov.in or nearest Arasu centre",
      "Fill online or offline application form",
      "Attach required documents",
      "Verification by local officials",
      "Monthly amount credited to registered bank account"
    ],
    "link": "https://makkalurimai.tn.gov.in",
    "description_en": "Monthly income of Rs 1000 for women from low-income families in Tamil Nadu — empowering women with financial independence",
    "description_local": "குறைந்த வருமான குடும்பங்களில் உள்ள பெண்களுக்கு மாதந்தோறும் ₹1000 வருமானம் — பெண்களுக்கு நிதி சுதந்திரம்"
  },
  {
    "id": "tn-f-003",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Moovalur Ramamirtham Ammaiyar Ninaivu Marriage Assistance",
    "name_local": "மூவலூர் ராமாமிர்தம் அம்மையார் நினைவு திட்டம்",
    "category": "Women Empowerment",
    "gender": "Female",
    "min_age": 18,
    "max_age": 25,
    "income_limit": 72000,
    "occupations": ["Student", "Unemployed"],
    "eligibility": "Unmarried girls from families with income below Rs 72,000/year who completed at least 10th standard",
    "benefit": "Rs 50,000 cash + 8 grams gold thali + household items worth Rs 25,000",
    "documents": ["10th Mark Sheet", "Aadhaar Card", "Income Certificate", "Community Certificate", "Ration Card"],
    "steps": [
      "Apply at District Social Welfare Office or tn.gov.in",
      "Submit educational and income certificates",
      "Verification by officials",
      "Receive assistance on or before wedding date"
    ],
    "link": "https://tn.gov.in/moovalur",
    "description_en": "Marriage assistance for poor girls who completed 10th grade — Rs 50,000 cash + gold + household items",
    "description_local": "10ம் வகுப்பு படித்த ஏழை பெண்களுக்கு திருமண உதவி — ₹50,000 பணம் + தாலி + வீட்டு உபயோக பொருட்கள்"
  },
  {
    "id": "tn-f-004",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Vanitha Helpline & Safety Scheme (181)",
    "name_local": "வனிதா உதவி மையம் மற்றும் பாதுகாப்பு திட்டம் (181)",
    "category": "Women Safety",
    "gender": "Female",
    "min_age": 0,
    "max_age": 100,
    "income_limit": 1000000,
    "occupations": ["Homemaker", "Worker", "Student", "Self-Employed", "Unemployed", "Senior Citizen"],
    "eligibility": "All women in Tamil Nadu experiencing domestic violence, harassment, or distress",
    "benefit": "Immediate police assistance, free legal aid, shelter home access, counseling — 24x7 Helpline 181",
    "documents": ["No documents required for initial contact"],
    "steps": [
      "Call 181 (Vanitha Helpline) 24/7",
      "Explain your situation to the helpline officer",
      "Police deployed immediately if needed",
      "Access to free shelter, legal aid, and counseling"
    ],
    "link": "https://www.tn.gov.in/dept/wcd",
    "description_en": "Free 24/7 women's safety helpline (dial 181) — immediate police and legal help for domestic violence or harassment in Tamil Nadu",
    "description_local": "24/7 பெண்கள் பாதுகாப்பு உதவி எண் (181 அழைக்கவும்) — குடும்ப வன்முறை அல்லது துன்புறுத்தலுக்கு உடனடி போலீஸ் உதவி"
  },
  {
    "id": "tn-f-005",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Dr. Muthulakshmi Reddy Maternity Benefit Scheme",
    "name_local": "டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு நலத் திட்டம்",
    "category": "Health",
    "gender": "Female",
    "min_age": 18,
    "max_age": 45,
    "income_limit": 72000,
    "occupations": ["Homemaker", "Worker", "Unemployed", "Self-Employed"],
    "eligibility": "Pregnant women from BPL/low-income families with annual income below Rs 72,000",
    "benefit": "Rs 18,000 cash for 1st delivery, Rs 12,000 for 2nd delivery — covers nutrition and hospital expenses",
    "documents": ["Aadhaar Card", "Pregnancy Certificate", "Income Certificate", "Ration Card", "Bank Passbook"],
    "steps": [
      "Register at nearest Primary Health Centre",
      "Submit income and pregnancy certificates",
      "Monthly health check at PHC",
      "Amount credited in installments during and after pregnancy"
    ],
    "link": "https://tnhealth.tn.gov.in",
    "description_en": "Maternity cash benefit up to Rs 18,000 for poor pregnant women for nutrition and hospital expenses",
    "description_local": "ஏழை கர்ப்பிணிகளுக்கு ஊட்டச்சத்து மற்றும் மருத்துவமனை செலவுக்காக ₹18,000 மகப்பேறு ஊக்கத்தொகை"
  },
  {
    "id": "tn-f-006",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Self Employment Scheme for Women (NEEDS)",
    "name_local": "பெண்களுக்கான சுய வேலைவாய்ப்பு திட்டம் (NEEDS)",
    "category": "Employment",
    "gender": "Female",
    "min_age": 18,
    "max_age": 45,
    "income_limit": 200000,
    "occupations": ["Unemployed", "Worker", "Self-Employed"],
    "eligibility": "Unemployed women from SC/ST communities with annual income below Rs 2 lakh in Tamil Nadu",
    "benefit": "Rs 1 lakh grant for starting a business + free skill training + market linkage support",
    "documents": ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Business Plan", "Bank Passbook"],
    "steps": [
      "Apply at District SC/ST Corporation office or tn.gov.in",
      "Submit caste and income certificates",
      "Attend 5-day enterprise development training",
      "Verification and approval",
      "Grant amount credited to bank"
    ],
    "link": "https://tnscst.tn.gov.in",
    "description_en": "Rs 1 lakh startup grant for SC/ST unemployed women to launch small businesses with free training",
    "description_local": "சிறு தொழில் தொடங்க SC/ST வேலையில்லா பெண்களுக்கு ₹1 லட்சம் மானியம், இலவச பயிற்சியுடன்"
  },
  {
    "id": "tn-f-007",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Tamil Nadu Women's Development Corporation Low-Interest Loan",
    "name_local": "மகளிர் மற்றும் பெண்கள் முன்னேற்ற நிதியம்",
    "category": "Finance",
    "gender": "Female",
    "min_age": 18,
    "max_age": 55,
    "income_limit": 300000,
    "occupations": ["Homemaker", "Worker", "Self-Employed", "Unemployed"],
    "eligibility": "Women from all communities with annual income below Rs 3 lakh. Preference to widows, divorcees, and differently-abled women.",
    "benefit": "Low-interest loans from Rs 50,000 to Rs 5 lakh at 4% interest for micro businesses",
    "documents": ["Aadhaar Card", "Income Certificate", "Business Plan", "Ration Card", "Bank Passbook"],
    "steps": [
      "Visit Tamil Nadu Corporation for Development of Women office",
      "Submit application with required documents",
      "Loan processing and approval",
      "Amount disbursed to bank account"
    ],
    "link": "https://tncorporation.tn.gov.in",
    "description_en": "Subsidized micro-business loans for women at just 4% interest through Women's Development Corporation of Tamil Nadu",
    "description_local": "தமிழ்நாடு பெண்கள் மேம்பாட்டு நிறுவனம் வாயிலாக பெண்களுக்கு 4% வட்டியில் சிறு தொழில் கடன்"
  },
  {
    "id": "tn-f-008",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Pudhumai Penn Higher Education Scholarship",
    "name_local": "புதுமைப் பெண் உயர்கல்வி உதவித்தொகை",
    "category": "Education",
    "gender": "Female",
    "min_age": 17,
    "max_age": 25,
    "income_limit": 300000,
    "occupations": ["Student"],
    "eligibility": "Girl students who studied in government schools and scored above 60% in 12th standard and are pursuing higher education",
    "benefit": "Rs 1,000 per month scholarship directly to girl student's bank account until completion of degree",
    "documents": ["12th Mark Sheet", "Aadhaar Card", "College Enrollment Proof", "Income Certificate", "Bank Passbook"],
    "steps": [
      "Apply at tn.gov.in/pudhumaipenn",
      "Upload 12th mark sheet and college enrollment proof",
      "Verification by district educational officer",
      "Monthly Rs 1000 credited to student's bank account"
    ],
    "link": "https://tn.gov.in/pudhumaipenn",
    "description_en": "Rs 1000 monthly scholarship for girl students from government schools pursuing higher education in Tamil Nadu",
    "description_local": "அரசு பள்ளியில் படித்த மாணவிகளுக்கு உயர்கல்வியில் மாதந்தோறும் ₹1000 உதவித்தொகை"
  },
  {
    "id": "tn-tg-001",
    "state": "TN",
    "state_name": "Tamil Nadu",
    "name_en": "Thirunangai Welfare Scheme (Transgender Welfare)",
    "name_local": "திருநங்கை நல திட்டம்",
    "category": "Social Security",
    "gender": "Transgender",
    "min_age": 18,
    "max_age": 65,
    "income_limit": 1000000,
    "occupations": ["Unemployed", "Worker", "Self-Employed"],
    "eligibility": "Transgender individuals registered with Tamil Nadu Transgender Welfare Board with a TG certificate",
    "benefit": "Rs 1,000 monthly pension + free sex reassignment surgery at government hospitals + educational scholarships + free skill training",
    "documents": ["Aadhaar Card", "Transgender Certificate (from TG Welfare Board)", "Bank Passbook"],
    "steps": [
      "Register with Tamil Nadu Transgender Welfare Board",
      "Obtain Transgender Identity Certificate",
      "Apply for pension at District Social Welfare Office",
      "Monthly benefit credited to bank account"
    ],
    "link": "https://tn.gov.in/transgenderwelfare",
    "description_en": "Comprehensive welfare for transgender persons including monthly pension, free surgery, scholarship and skill training",
    "description_local": "திருநங்கைகளுக்கு மாதாந்திர ஓய்வூதியம், இலவச அறுவை சிகிச்சை, கல்வி உதவித்தொகை மற்றும் திறன் பயிற்சி உள்ளிட்ட விரிவான நல திட்டம்"
  }
];

// Add new schemes
const updatedSchemes = [...schemes, ...newSchemes];
fs.writeFileSync(schemesPath, JSON.stringify(updatedSchemes, null, 2), 'utf8');

console.log(`Done! Added ${newSchemes.length} new female/transgender schemes.`);
console.log(`Total schemes: ${updatedSchemes.length}`);
