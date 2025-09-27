document.addEventListener('DOMContentLoaded', () => {
    // FAQ data, including prefixes for each category
    const faqData = [
        {
            prefix: 'Returns & Exchanges',
            items: [
                {
                    question: "What is your return policy?",
                    answer: "You can return items within 30 days of purchase, provided they are in their original condition with all tags attached."
                },
                {
                    question: "How do I start a return or exchange?",
                    answer: "To initiate a return, please visit our Returns Center on our website and follow the instructions provided."
                },
                {
                    question: "When will I get my refund?",
                    answer: "Refunds are processed within 5-7 business days after we receive and inspect your returned item."
                },
                {
                    question: "Can I exchange an item for a different size?",
                    answer: "Yes, exchanges for a different size are subject to availability. Please contact customer service to check stock."
                }
            ]
        },
        {
            prefix: 'Ordering & Payment',
            items: [
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major somali pay ment, Evs, Edahab, and Wafi."
                },
                {
                    question: "Can I apply a promo code or gift card at checkout?",
                    answer: "Yes, you can apply promo codes and gift cards in the 'Payment' section during checkout."
                },
                {
                    question: "Can I modify or cancel my order after placing it?",
                    answer: "Orders can be modified or canceled within 2 hours of placement. Please contact our support team immediately."
                },
                {
                    question: "Do you offer pre-orders?",
                    answer: "Yes, we offer pre-orders on select items. The estimated shipping date will be listed on the product page."
                }
            ]
        },
        {
            prefix: 'Shipping & Delivery',
            items: [
                {
                    question: "Where do you ship?",
                    answer: "We ship to most locations worldwide. Please enter your address at checkout to see if we deliver to your area."
                },
                {
                    question: "How long does shipping take?",
                    answer: "Standard shipping typically takes 5-7 business days. Expedited shipping options are available at checkout."
                },
                {
                    question: "How can I track my order?",
                    answer: "Once your order has shipped, you will receive a confirmation email with a tracking number and a link to track your package."
                },
                {
                    question: "What if my package is lost or delayed?",
                    answer: "If your package is lost or significantly delayed, please contact our customer support team for assistance."
                }
            ]
        },
        {
            prefix: 'Sizing & Fit',
            items: [
                {
                    question: "How do I know what size to order?",
                    answer: "We provide a detailed sizing chart on each product page to help you find the perfect fit."
                },
                {
                    question: "Do your products run true to size?",
                    answer: "Our products generally run true to size, but we recommend checking the size chart for specific measurements."
                },
                {
                    question: "What if I'm between sizes?",
                    answer: "If you are between sizes, we recommend sizing up for a more comfortable fit."
                },
                {
                    question: "Can I return or exchange if it doesn't fit?",
                    answer: "Yes, we offer free returns and exchanges for items that do not fit properly."
                }
            ]
        }
    ];

    const accordion = document.querySelector('.accordion');

    // Function to render FAQ categories and items
    const renderFAQs = () => {
        faqData.forEach(faqCategory => {
            const categorySection = document.createElement('div');
            categorySection.classList.add('faq-category');

            const categoryHeader = document.createElement('h2');
            categoryHeader.textContent = faqCategory.prefix; // Use the prefix for the category title
            categorySection.appendChild(categoryHeader);

            faqCategory.items.forEach(item => {
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq-item');

                const faqQuestion = document.createElement('div');
                faqQuestion.classList.add('faq-question');
                faqQuestion.textContent = item.question;
                
                const faqAnswer = document.createElement('div');
                faqAnswer.classList.add('faq-answer');
                faqAnswer.textContent = item.answer;

                faqItem.appendChild(faqQuestion);
                faqItem.appendChild(faqAnswer);
                categorySection.appendChild(faqItem);

                // Add click event listener for toggling
                faqQuestion.addEventListener('click', () => {
                    // Close all other open answers
                    document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                        if (openAnswer !== faqAnswer) {
                            openAnswer.classList.remove('open');
                            openAnswer.previousElementSibling.classList.remove('active');
                        }
                    });

                    // Toggle the clicked question
                    faqQuestion.classList.toggle('active');
                    faqAnswer.classList.toggle('open');
                });
            });

            accordion.appendChild(categorySection);
        });
    };

    renderFAQs();
});