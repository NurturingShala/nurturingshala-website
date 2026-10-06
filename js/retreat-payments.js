/* Live £200 deposit checkout. Accommodation is required again in Stripe.
   No automatic inventory limit: owner manages availability. */
const retreatDepositLinks = Object.freeze({
    'shared-room': 'https://buy.stripe.com/bJebJ3a0A98Y6o58wveEo00',
    'private-room': 'https://buy.stripe.com/bJebJ3a0A98Y6o58wveEo00',
    'shared-tent': 'https://buy.stripe.com/bJebJ3a0A98Y6o58wveEo00',
    'private-tent': 'https://buy.stripe.com/bJebJ3a0A98Y6o58wveEo00'
});

(() => {
    const rooms = {
        'shared-room': { name: 'Shared room', early: 700, standard: 750 },
        'private-room': { name: 'Private room', early: 740, standard: 790 },
        'shared-tent': { name: 'Shared bell tent', early: 600, standard: 650 },
        'private-tent': { name: 'Private bell tent', early: 660, standard: 710 }
    };
    const select = document.getElementById('room-choice');
    if (!select) return;
    const summary = document.getElementById('booking-summary');
    const payment = document.getElementById('deposit-payment');
    const status = document.getElementById('payment-status');
    const money = amount => `£${amount}`;
    function updateBooking() {
        const room = rooms[select.value];
        if (!room) return;
        // Prices remain transparent on the cards; this summary follows the booking date.
        const earlyBird = Date.now() < Date.parse('2027-02-01T00:00:00Z');
        const pastBalanceDeadline = Date.now() >= Date.parse('2027-02-17T00:00:00Z');
        const total = earlyBird ? room.early : room.standard;
        summary.replaceChildren();
        const list = document.createElement('dl');
        for (const [label, value] of [[`${earlyBird ? 'Early-bird' : 'Standard'} total`, money(total)], ['Deposit (non-refundable)', money(200)], ['Balance due 16 February 2027', money(total - 200)]]) {
            const row = document.createElement('div');
            const term = document.createElement('dt');
            const description = document.createElement('dd');
            term.textContent = label; description.textContent = value;
            row.append(term, description); list.append(row);
        }
        summary.append(list);
        const subject = `Back to Balance | 2–5 April 2027 | ${room.name}`;
        const body = `Hello Ankit,\n\nI would like to book Back to Balance, 2–5 April 2027.\nAccommodation: ${room.name}\nPrice per person: ${money(total)}\nDeposit: £200 (non-refundable)\nBalance: ${money(total - 200)}, due 16 February 2027\n\nPlease confirm availability and how to pay.\nName:\nNumber of guests:\n\nThank you.`;
        payment.href = `mailto:nurturingshala@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        payment.textContent = 'Email to book';
        status.textContent = pastBalanceDeadline ? 'Please contact Ankit to check availability and arrange payment in full, as the balance deadline has passed.' : 'To book, email Ankit to check availability and arrange your £200 deposit.';
        const link = retreatDepositLinks[select.value];
        if (link && !pastBalanceDeadline) {
            try {
                const url = new URL(link);
                if (url.protocol !== 'https:' || url.hostname !== 'buy.stripe.com' || url.pathname.startsWith('/test_') || url.username || url.password) return;
                payment.href = url.href;
                payment.textContent = 'Pay £200 deposit securely';
                status.textContent = 'Continue to Stripe’s secure checkout, select your accommodation there, and pay your £200 non-refundable deposit for one guest. The remaining balance is paid separately by 16 February 2027; it is not charged automatically.';
            } catch { /* Keep the email route if a link is missing or invalid. */ }
        }
    }
    select.addEventListener('change', updateBooking);
    document.querySelectorAll('[data-room-choice]').forEach(link => {
        link.addEventListener('click', () => {
            select.value = link.dataset.roomChoice;
            updateBooking();
            select.focus({ preventScroll: true });
        });
    });
    updateBooking();
})();
