// Sample campaign data
const campaigns = [
    {
        id: 1,
        title: "Feed Hungry Children",
        ngo: "Children's Care Foundation",
        description: "Help us provide nutritious meals to underprivileged children",
        image: "https://imgs.search.brave.com/nczzXyGa0kPzZNbV6kMoQ26C3VS7zQtvtiJSnOukdmQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/NDI3ODAwNS9waG90/by9odW5ncnkta2lk/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dFhwLWpIRjk3/Vzd3WFhMNF9aSDhk/S2hJdUdSZkRGLXRj/ZlhBTHFucXFYZz0",
        target: 500000,
        raised: 350000,
        daysLeft: 15
    },
    {
        id: 2,
        title: "Education for All",
        ngo: "Education Trust",
        description: "Support education for underprivileged students",
        image: "https://img.freepik.com/premium-photo/create-flyer-where-students-are-going-abroad-higher-studies_950002-318085.jpg?w=1380",
        target: 300000,
        raised: 150000,
        daysLeft: 20
    },
    {
        id: 3,
        title: "Medical Aid for Elderly",
        ngo: "Elder Care Society",
        description: "Provide medical support to senior citizens",
        image: "https://img.freepik.com/free-photo/revealing-shot-young-male-nurse-listening-old-retired-man-heartbeat-bright-cozy-nursing-home-caregiver-social-worker_482257-20719.jpg?t=st=1745404117~exp=1745407717~hmac=3d8fbe014339035d943d99141445c9250dccb58158e0a719b4b4870360e7edf1&w=1380",
        target: 400000,
        raised: 280000,
        daysLeft: 10
    }
];

// Sample testimonials
const testimonials = [
    {
        name: "John Doe",
        text: "Amazing platform! I can easily track where my donations are being used.",
        image: "https://imgs.search.brave.com/M2EXLUpBKLvyzK_jebktcJIez9sh_fWxLa9Kq9LoFs0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzA0LzUyLzA3/LzM2MF9GXzYwNDUy/MDc4MF9mSjlxbTVH/MGtmemZrQVRlOFhG/OFBVV3VkaXYwdllI/Si5qcGc"
    },
    {
        name: "Jane Smith",
        text: "The transparency and ease of use make this platform stand out.",
        image: "https://imgs.search.brave.com/qM4YQm3AiPh4ELqDJ8QTq2_w1VG2hVIIzEpW9u7QdhI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9SYW5kb20t/aW1hZ2UtZ2VuZXJh/dG9yXzUuanBn"
    }
];

// Populate Featured Campaigns
function displayCampaigns() {
    const campaignGrid = document.getElementById('campaignGrid');
    
    campaigns.forEach(campaign => {
        const progressPercentage = (campaign.raised / campaign.target) * 100;
        
        const campaignCard = document.createElement('div');
        campaignCard.className = 'campaign-card';
        campaignCard.innerHTML = `
            <img src="${campaign.image}" alt="${campaign.title}">
            <div class="campaign-info">
                <h3>${campaign.title}</h3>
                <p>${campaign.description}</p>
                <p class="ngo-name">by ${campaign.ngo}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="campaign-stats">
                    <p>₹${campaign.raised.toLocaleString()} raised of ₹${campaign.target.toLocaleString()}</p>
                    <p>${campaign.daysLeft} days left</p>
                </div>
                <button onclick="donateToCampaign(${campaign.id})" class="donate-btn">Donate Now</button>
            </div>
        `;
        
        campaignGrid.appendChild(campaignCard);
    });
}

// Donation handler
function donateToCampaign(campaignId) {
    const campaign = campaigns.find(c => c.id === campaignId);
    const amount = prompt(`Enter amount to donate to ${campaign.title}:`);
    
    if (amount && !isNaN(amount)) {
        alert(`Thank you for donating ₹${amount} to ${campaign.title}!`);
        // Here you would typically handle the payment processing
    }
}

// Testimonial Slider
let currentTestimonialIndex = 0;

function showTestimonial() {
    const slider = document.getElementById('testimonialSlider');
    const testimonial = testimonials[currentTestimonialIndex];
    
    slider.innerHTML = `
        <div class="testimonial">
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <p>${testimonial.text}</p>
            <h4>${testimonial.name}</h4>
        </div>
    `;
    
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayCampaigns();
    showTestimonial();
    setInterval(showTestimonial, 5000); // Rotate testimonials every 5 seconds
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal handling functions
function openDonateModal() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        // Show login prompt modal instead of donation modal
        showLoginPrompt();
        return;
    }
    
    const modal = document.getElementById('donateModal');
    const select = document.getElementById('campaignSelect');
    
    // Clear existing options
    select.innerHTML = '<option value="">Select a campaign</option>';
    
    // Populate campaign options
    campaigns.forEach(campaign => {
        const option = document.createElement('option');
        option.value = campaign.id;
        option.textContent = campaign.title;
        select.appendChild(option);
    });
    
    modal.style.display = 'block';
}

function showLoginPrompt() {
    const modal = document.getElementById('loginPromptModal');
    modal.style.display = 'block';
}

// Close modal when clicking the X or outside the modal
document.addEventListener('DOMContentLoaded', () => {
    const donateModal = document.getElementById('donateModal');
    const loginPromptModal = document.getElementById('loginPromptModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(btn => {
        btn.onclick = () => {
            donateModal.style.display = 'none';
            loginPromptModal.style.display = 'none';
        };
    });
    
    window.onclick = (event) => {
        if (event.target === donateModal || event.target === loginPromptModal) {
            donateModal.style.display = 'none';
            loginPromptModal.style.display = 'none';
        }
    };
});

function processDonation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        showLoginPrompt();
        return;
    }
    
    const campaignSelect = document.getElementById('campaignSelect');
    const amountInput = document.getElementById('donationAmount');
    
    const campaignId = parseInt(campaignSelect.value);
    const amount = parseFloat(amountInput.value);
    
    if (!campaignId) {
        alert('Please select a campaign');
        return;
    }
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    const campaign = campaigns.find(c => c.id === campaignId);
    
    // Here you would typically integrate with a payment gateway
    alert(`Thank you for donating ₹${amount} to ${campaign.title}!`);
    
    // Close the modal and reset form
    document.getElementById('donateModal').style.display = 'none';
    campaignSelect.value = '';
    amountInput.value = '';
}
