from fpdf import FPDF
import re

mahati_text = """Election Manifesto
Mahati VVS
Presidential Nominee

Initiatives for the AY 26 -27
Improving Council Transparency
Students Union Council Portal
Every fresher who walks onto this campus spends their first weeks lost...
This portal would be accessible to students across all years...

- A campus GPS tracker to help freshers...
- A live campus Bus tracker...
- Vendor timings for all food outlets...
- A directory of professor chambers...
- A grievance portal where students can log complaints...
- An alumni-student connect...
- I would integrate a Student Union YouTube channel...

FREQUENT AND EFFICIENT GBMs
GBMs form the backbone of guiding the path...

PROPOSING CCIT CHANGES
As part of last year's changes with the LAN networks...

POST FEST FOB MEET
Fests involve hundreds of moving parts...

MOBILE REPAIR SERVICES
Students dealing with a cracked screen...

SPORTS upliftment
HALL OF FAME
Sport on this campus produces exceptional talent...

Structured Sports Calendar and better Participation
Across BITS campuses, sports events...
- Establish a designated cross-campus sports calendar...
- Introduce year-round sports and activity initiatives...
- Work with the administration and Sports Senate to ensure coaches...

Cultural Upliftment
Jamming Nights...

Technical Culture...

Revival of DC++ And H4U...

GENERAL ISSUES
- Mosquito activity on campus has seen a noticeable rise...
- Will strive for better availability of drinking water...
- Push for the renovation of SAC washrooms...

CREDENTIALS
Anti Ragging Committee Representative
I-Cell
Inter-bits sponsorship lead
Verba Maximus logistics head

Why me?
If there is one thing that has defined student life on this campus...
THANK YOU FOR YOUR TIME AND CONSIDERATION
MAHATI
"""

sathvik_text = """MANIFESTO
SATHVIK REDDY LAXMANNAGARI
General Secretary Nominee

Let me make one thing clear:
General Secretary is not about a title, power, or a line on a resume.
At BPHC, where there is so much talent and potential...

STUDENT WELFARE INITIATIVES
1. Blinkit: 20-Minute Grocery Delivery
I have observed that while the rest of the city enjoys groceries...

2. Reliable water & Sanitation
- I have noticed that despite the high volume of students...
- I will prioritize the regular servicing...

3. Accessible Stationary Solutions
- Trekking long distances during midsem or compre season...

4. Better Vending Machines on Campus
- Most vending machines on our campus are from Vendiman...

5. Smart Campus Occupancy Tracker
- I understand how frustrating it is to have your newfound gym motivation broken...

FEST INITIATIVES
6. Automated Fest Accommodation
- I have already built "Book My Bed"...

7. Efficient Campus Navigation
- To improve accessibility, especially during fests...

HOSTEL AND INFRASTRUCTURE INITIATIVES
8. Unisex Salon on Campus
- For a decent haircut, many of us end up spending around Rs. 480...

9. Hostel Hygiene Upgrade
- I have seen how rainwater entering through perforated panels...

10. OFG Concrete Footpath
- After consulting the Director...

OTHER INITIATIVES
11. Inter College Collaboration & Club Expansion
12. Transparent Governance & Reliability

CREDENTIALS
NIRMAAN | RESEARCH & PROJECT EXPANSION LEAD
BITSAA Global Meet | Core Coordinator & Alumni Liaison
DEPARTMENT OF PUBLICITY & PUBLIC RELATIONS
DEPARTMENT OF SPONSORSHIP & MARKETING
DEPARTMENT OF CONTROLZ
DEPARTMENT OF FIREWALLZ
STUDENT UNION MANAGEMENT TEAM (SUMT)
BRINDAVANAM
ACADEMIC UNDERGRADUATE STUDIES DIVISION (AUGSD)
ADMISSIONS DIVISION
SPORTS
NSS - EXECUTIVE COMMITTEE MEMBER
IEEE
ORGANIZING COMMITTEES

WHY ME?
"General Secretary of BITS Pilani, Hyderabad Campus" - that is a very big responsibility.
And that is who I am SATHVIK REDDY, a hardcore Phoenix Circuital BITSIAN.
I am not here to make big promises. I am here to take responsibility.
"""

def create_pdf(text, filename):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_font("Arial", size=12)
    
    # Replace unicode dashes/bullets with standard ones, remove bad chars
    text = text.replace('‘', "'").replace('’', "'").replace('”', '"').replace('“', '"')
    text = text.replace('—', '-').replace('–', '-').replace('•', '-')
    
    for line in text.split('\n'):
        # Just encode directly to latin-1 to avoid errors
        line = line.encode('latin-1', 'replace').decode('latin-1')
        pdf.multi_cell(0, 7, line)
        
    pdf.output(filename)

create_pdf(mahati_text, "mahati_manifesto.pdf")
create_pdf(sathvik_text, "sathvik_manifesto.pdf")
print("PDFs created successfully")
