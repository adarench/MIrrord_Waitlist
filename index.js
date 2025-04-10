// Import GSAP and plugins for animations
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initDecorationAnimation();
    addTypewriterEffect();
    initTraderSelection();
    initTradeFeed();
    initPortfolioDemo();
    initFeatureCards();
    initAboutSection();
});

function initHeroAnimation() {
    // Animate the trade card flow
    const tradeCard = document.querySelector('.trade-card');
    const mirroredConfirmation = document.querySelector('.mirrored-confirmation');
    const portfolioCard = document.querySelector('.portfolio-card');
    const miniChart = document.querySelector('.mini-chart path');
    
    if (!tradeCard || !mirroredConfirmation || !portfolioCard) return;

    // Initially hide elements
    gsap.set([mirroredConfirmation, portfolioCard], { 
        autoAlpha: 0,
        y: 10
    });
    
    // Set initial state for the chart path
    if (miniChart) {
        const pathLength = miniChart.getTotalLength();
        gsap.set(miniChart, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
    }

    // Create animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Animation sequence
    tl.from(tradeCard, { 
        autoAlpha: 0, 
        y: 20, 
        duration: 0.8,
        ease: "power2.out" 
    })
    .to(mirroredConfirmation, { 
        autoAlpha: 1, 
        y: 0, 
        duration: 0.5,
        ease: "power2.out" 
    }, "+=0.5")
    .to(portfolioCard, { 
        autoAlpha: 1, 
        y: 0, 
        duration: 0.5,
        ease: "power2.out" 
    }, "+=0.3")
    
    // Animate the chart line drawing
    if (miniChart) {
        tl.to(miniChart, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power1.inOut"
        }, "-=0.2");
    }
    
    // Add a pause before resetting
    tl.to({}, { duration: 2 })
    
    // Reset animation
    .to([tradeCard, mirroredConfirmation, portfolioCard], { 
        autoAlpha: 0, 
        y: -10, 
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.1
    })
    .set([tradeCard, mirroredConfirmation, portfolioCard], { 
        y: 10
    })
    .set(miniChart, {
        strokeDashoffset: miniChart ? miniChart.getTotalLength() : 0
    });
}

function initDecorationAnimation() {
    // Animate decorative elements
    const glowCircle = document.querySelector('.glow-circle');
    const dotsPattern = document.querySelector('.dots-pattern');
    
    if (glowCircle) {
        gsap.to(glowCircle, {
            x: 20,
            y: 20,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    if (dotsPattern) {
        gsap.to(dotsPattern, {
            x: -15,
            y: 15,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    // Subtle header animation on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

function addTypewriterEffect() {
    // Add typewriter effect to ticker symbols and numbers
    const tickerElements = document.querySelectorAll('.ticker, .price');
    
    tickerElements.forEach(el => {
        const originalText = el.textContent;
        el.textContent = '';
        
        // Create typewriter effect
        gsap.to(el, {
            duration: 0.05 * originalText.length,
            text: originalText,
            ease: "none",
            delay: 1
        });
    });
}

// Initialize trader selection in demo section
function initTraderSelection() {
    const traderCards = document.querySelectorAll('.trader-card');
    const followButtons = document.querySelectorAll('.trader-follow-btn');
    
    if (!traderCards.length) return;
    
    // Handle trader card selection
    traderCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            traderCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected card
            card.classList.add('active');
            
            // Update trade feed to show selected trader's trades
            updateTradeFeed(card.dataset.trader);
        });
    });
    
    // Handle follow button clicks
    followButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering card click
            
            const isFollowing = button.classList.contains('following');
            
            if (isFollowing) {
                button.textContent = 'Follow';
                button.classList.remove('following');
                button.classList.remove('btn-primary');
                button.classList.add('btn-outline');
            } else {
                button.textContent = 'Following';
                button.classList.add('following');
                button.classList.remove('btn-outline');
                button.classList.add('btn-primary');
                
                // Show success animation
                gsap.to(button, {
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'rgba(16, 185, 129, 0.5)',
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    });
}

// Initialize and populate trade feed
function initTradeFeed() {
    const tradeFeedContainer = document.querySelector('.trade-feed-container');
    
    if (!tradeFeedContainer) return;
    
    // Sample trade data for demonstration
    const tradeData = {
        optionGuru: [
            { id: 1, trader: '@OptionGuru', action: 'bought', ticker: 'SPY', type: 'Call', strike: '$430', exp: 'Jun 21', quantity: '10 contracts', price: '$5.35', time: 'Just now', actionType: 'buy' },
            { id: 2, trader: '@OptionGuru', action: 'sold', ticker: 'AAPL', type: 'Put', strike: '$170', exp: 'Jul 15', quantity: '5 contracts', price: '$3.85', time: '2m ago', actionType: 'sell' },
            { id: 3, trader: '@OptionGuru', action: 'bought', ticker: 'QQQ', type: 'Call', strike: '$320', exp: 'May 28', quantity: '15 contracts', price: '$4.20', time: '15m ago', actionType: 'buy' }
        ],
        techAlpha: [
            { id: 1, trader: '@TechAlpha', action: 'bought', ticker: 'NVDA', quantity: '50 shares', price: '$843.22', time: 'Just now', actionType: 'buy' },
            { id: 2, trader: '@TechAlpha', action: 'bought', ticker: 'MSFT', quantity: '20 shares', price: '$407.35', time: '5m ago', actionType: 'buy' },
            { id: 3, trader: '@TechAlpha', action: 'sold', ticker: 'AMD', quantity: '100 shares', price: '$158.20', time: '22m ago', actionType: 'sell' }
        ],
        cryptoKing: [
            { id: 1, trader: '@CryptoKing', action: 'bought', ticker: 'BTC', quantity: '0.25 BTC', price: '$62,450', time: 'Just now', actionType: 'buy' },
            { id: 2, trader: '@CryptoKing', action: 'sold', ticker: 'SOL', quantity: '15 SOL', price: '$143.75', time: '8m ago', actionType: 'sell' },
            { id: 3, trader: '@CryptoKing', action: 'bought', ticker: 'ETH', quantity: '2 ETH', price: '$3,120', time: '30m ago', actionType: 'buy' }
        ]
    };
    
    // Function to update trade feed with selected trader's trades
    window.updateTradeFeed = function(trader) {
        if (!tradeData[trader]) return;
        
        // Clear existing trades
        tradeFeedContainer.innerHTML = '';
        
        // Create and append trade items with staggered animation
        tradeData[trader].forEach((trade, index) => {
            const tradeItem = document.createElement('div');
            tradeItem.className = `trade-item ${trade.actionType}`;
            tradeItem.style.animationDelay = `${index * 0.2}s`;
            
            tradeItem.innerHTML = `
                <div class="trade-item-header">
                    <span class="trade-item-trader">${trade.trader}</span>
                    <span class="trade-item-time">${trade.time}</span>
                </div>
                <div class="trade-item-action ${trade.actionType}">
                    ${trade.action} ${trade.ticker} ${trade.type ? `${trade.type} ${trade.strike} ${trade.exp}` : ''}
                </div>
                <div class="trade-item-details">
                    <span>${trade.quantity}</span>
                    <span>@ ${trade.price}</span>
                </div>
                <button class="mirror-btn">Mirror this trade</button>
            `;
            
            tradeFeedContainer.appendChild(tradeItem);
        });
        
        // Add mirror button functionality
        document.querySelectorAll('.mirror-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('mirrored')) return;
                
                this.classList.add('mirrored');
                this.textContent = 'Trade Mirrored ✓';
                
                // Update portfolio after mirroring
                updatePortfolio(this.closest('.trade-item'));
            });
        });
    }
    
    // Initialize with default trader
    updateTradeFeed('optionGuru');
}

// Initialize portfolio demo
function initPortfolioDemo() {
    const portfolioHoldings = document.querySelector('.portfolio-holdings');
    const portfolioValue = document.querySelector('.value-amount');
    const portfolioChange = document.querySelector('.value-change');
    
    if (!portfolioHoldings) return;
    
    // Sample holdings data
    const holdings = [
        { ticker: 'AAPL', shares: '15 shares', value: '$3,240.75', change: '+1.8%', changeType: 'positive' },
        { ticker: 'MSFT', shares: '8 shares', value: '$3,258.80', change: '+2.3%', changeType: 'positive' },
        { ticker: 'TSLA', shares: '10 shares', value: '$1,930.40', change: '-0.5%', changeType: 'negative' }
    ];
    
    // Populate initial holdings
    holdings.forEach((holding, index) => {
        const holdingItem = document.createElement('div');
        holdingItem.className = 'holding-item';
        holdingItem.style.animationDelay = `${index * 0.2}s`;
        
        holdingItem.innerHTML = `
            <div class="holding-info">
                <span class="holding-ticker">${holding.ticker}</span>
                <span class="holding-shares">${holding.shares}</span>
            </div>
            <div class="holding-value">
                <span class="holding-amount">${holding.value}</span>
                <span class="holding-change ${holding.changeType}">${holding.change}</span>
            </div>
        `;
        
        portfolioHoldings.appendChild(holdingItem);
    });
    
    // Function to update portfolio when mirroring trades
    window.updatePortfolio = function(tradeItem) {
        if (!tradeItem) return;
        
        // Extract trade details
        const ticker = tradeItem.querySelector('.trade-item-action').textContent.match(/\b[A-Z]+\b/)[0];
        const actionType = tradeItem.classList.contains('buy') ? 'buy' : 'sell';
        const details = tradeItem.querySelector('.trade-item-details').textContent;
        
        // Create new holding
        const holdingItem = document.createElement('div');
        holdingItem.className = 'holding-item new-holding';
        
        // Parse quantity from details
        const quantityMatch = details.match(/(\d+)\s+(shares|contracts)/);
        const quantity = quantityMatch ? quantityMatch[0] : '10 shares';
        
        // Generate a random value for demonstration
        const randomValue = Math.floor(Math.random() * 5000) + 1000;
        const formattedValue = '$' + randomValue.toLocaleString();
        
        // Generate a random change percentage
        const changePercent = ((Math.random() * 5) + 0.5).toFixed(1);
        const changeType = actionType === 'buy' ? 'positive' : (Math.random() > 0.7 ? 'positive' : 'negative');
        const changeText = (changeType === 'positive' ? '+' : '-') + changePercent + '%';
        
        holdingItem.innerHTML = `
            <div class="holding-info">
                <span class="holding-ticker">${ticker}</span>
                <span class="holding-shares">${quantity}</span>
            </div>
            <div class="holding-value">
                <span class="holding-amount">${formattedValue}</span>
                <span class="holding-change ${changeType}">${changeText}</span>
            </div>
        `;
        
        // Add to portfolio with highlight effect
        portfolioHoldings.prepend(holdingItem);
        
        // Animate the new holding
        gsap.fromTo(holdingItem, 
            { opacity: 0, y: -10, backgroundColor: 'rgba(33, 150, 243, 0.2)' },
            { opacity: 1, y: 0, backgroundColor: 'transparent', duration: 0.8, ease: 'power2.out' }
        );
        
        // Update portfolio value with animation
        if (portfolioValue) {
            const currentValue = parseFloat(portfolioValue.textContent.replace(/[$,]/g, ''));
            const tradeValue = randomValue;
            const newValue = actionType === 'buy' ? currentValue + tradeValue : currentValue - tradeValue;
            
            gsap.to(portfolioValue, {
                duration: 1.5,
                text: {
                    value: '$' + newValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
                    type: 'diff'
                },
                ease: 'power2.out'
            });
            
            // Update portfolio change
            if (portfolioChange) {
                const newChangePercent = ((Math.random() * 3) + 0.5).toFixed(1);
                portfolioChange.textContent = '+' + newChangePercent + '% today';
                
                gsap.fromTo(portfolioChange, 
                    { backgroundColor: 'rgba(16, 185, 129, 0.3)' },
                    { backgroundColor: 'rgba(16, 185, 129, 0.1)', duration: 1.5 }
                );
            }
        }
        
        // Limit the number of holdings shown
        if (portfolioHoldings.children.length > 5) {
            portfolioHoldings.removeChild(portfolioHoldings.lastChild);
        }
    }
}

// Initialize feature cards animations
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresDetail = document.querySelector('.features-detail');
    const deviceTrades = document.querySelectorAll('.device-trade');
    
    if (!featureCards.length) return;
    
    // Create a GSAP timeline for feature cards
    const cardTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#features',
            start: 'top 70%'
        }
    });
    
    // Add staggered animations to cards
    cardTimeline.from(featureCards, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Create a GSAP timeline for features detail section
    if (featuresDetail) {
        const detailTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.features-detail',
                start: 'top 80%'
            }
        });
        
        detailTimeline
            .from('.features-device-mockup', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.features-text h3', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.features-text p', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.features-list li', {
                y: 15,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.2');
    }
    
    // Animate device mockup trades
    if (deviceTrades.length) {
        // Create pulsing animation for trades
        gsap.to(deviceTrades, {
            opacity: 0.5,
            duration: 1.5,
            stagger: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Occasionally show a "new trade" effect on first trade
        setInterval(() => {
            gsap.fromTo(deviceTrades[0], 
                { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderLeftColor: 'var(--success-500)' },
                { backgroundColor: 'var(--gray-800)', duration: 1.5, ease: 'power2.out' }
            );
        }, 5000);
    }
    
    // Add hover effect to feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.feature-icon svg path'), {
                fill: card.querySelector('.feature-icon svg path').getAttribute('fill') || 'currentColor',
                opacity: 1,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.feature-icon svg path'), {
                opacity: 0.8,
                duration: 0.3
            });
        });
    });
}

// Initialize the About section animations
function initAboutSection() {
    const missionContent = document.querySelector('.mission-content');
    const waitlistCounter = document.querySelector('.waitlist-counter');
    const counterNumber = document.querySelector('.counter-number');
    const socialLinks = document.querySelectorAll('.social-link');
    
    if (!missionContent) return;
    
    // Create a timeline for the mission section
    const missionTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%'
        }
    });
    
    // Animate mission content elements
    missionTimeline
        .from('#about h2', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.mission-text', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.cta-container', {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out'
        }, '-=0.5')
        .from(socialLinks, {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.out'
        }, '-=0.4')
        .from(waitlistCounter, {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.4)'
        }, '-=0.2');
    
    // Animate counter if it exists
    if (counterNumber) {
        // Get the target number from the HTML
        const targetNumber = parseInt(counterNumber.textContent.replace(/,/g, ''), 10);
        
        // Create counter animation
        const counterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: waitlistCounter,
                start: 'top 80%'
            }
        });
        
        counterTimeline.from(counterNumber, {
            textContent: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.5,
            onUpdate: function() {
                counterNumber.textContent = Math.round(this.targets()[0].textContent).toLocaleString();
            }
        });
    }
    
    // Add mesh background animation
    gsap.to('.mesh-background', {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Add hover animations for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn, .cta-discord');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -3,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                duration: 0.3
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                boxShadow: button.classList.contains('cta-btn') ? 
                    '0 4px 14px rgba(33, 150, 243, 0.3)' : 'none',
                duration: 0.3
            });
        });
    });
    
    // Add pulsing effect to waitlist counter
    if (waitlistCounter) {
        gsap.to(waitlistCounter, {
            boxShadow: '0 0 20px rgba(33, 150, 243, 0.3)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Animate on scroll initialization for footer
function initFooter() {
    const footer = document.querySelector('footer');
    
    if (footer) {
        gsap.from(footer.querySelectorAll('.footer-content > *'), {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: footer,
                start: 'top 90%'
            }
        });
    }
}

// Initialize footer animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initFooter();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 100
                },
                ease: 'power3.inOut'
            });
        }
    });
});