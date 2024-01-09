const optionsAndReasons = {
    "Room Not Found Upon Check In": {
        reason: "hotel does not have the reservation in their system; hotel is SOLD OUT and cannot accommodate guest; reserved room type is not available",
        usage: "This option is chosen when the hotel cannot find the reservation, is sold out, or the reserved room type is not available."
    },
    "Customer Booked Wrong Hotel": {
        reason: "self-booked, guest made error in booking (dates/location/occupancy/names/number of rooms/room type, etc.)",
        usage: "This option is chosen when the guest booked the wrong hotel, and the error involves dates, location, occupancy, names, number of rooms, room type, etc."
    },
    "Our Agent Booked Wrong Hotel": {
        reason: "sales agent made error in booking (dates/location/occupancy/names/number of rooms/room type, etc.)",
        usage: "This option is chosen when the sales agent booked the wrong hotel, and the error involves dates, location, occupancy, names, number of rooms, room type, etc."
    },
    "Client Requesting to Cancel": {
        reason: "guest notifies us that they wish to cancel the booking (please include the reason for cancellation and, if necessary, contact hotel for FOC approval)",
        usage: "This option is chosen when the guest requests to cancel the booking, and the agent needs to include the reason for cancellation and, if necessary, contact the hotel for FOC approval."
    },
    "Hotel Approved Partial Refund Verbally": {
        reason: "hotel informed agent that there WILL BE a penalty charged for cancellation",
        usage: "This option is chosen when the hotel verbally approves a partial refund and indicates that there will be a penalty charged for cancellation."
    },
    "Hotel Approved Partial Refund in Writing": {
        reason: "email received from hotel indicating a penalty WILL BE charged for cancellation",
        usage: "This option is chosen when the hotel sends an email indicating in writing that a penalty will be charged for cancellation, and a partial refund is approved."
    },
    "Hotel Approved Full Refund Verbally": {
        reason: "FOC received from hotel by agent (must include name/position/cancellation number or $0 folio)",
        usage: "This option is chosen when the hotel verbally approves a full refund, and an FOC (Free Of Charge) is received from the hotel by the agent. The FOC must include the name/position/cancellation number or $0 folio."
    },
    "Hotel Approved Full Refund in Writing": {
        reason: "hotel notified us by email that booking is canceled FOC",
        usage: "This option is chosen when the hotel notifies us by email in writing that the booking is canceled FOC (Free Of Charge)."
    },
    "Hotel Denied Refund": {
        reason: "hotel employee denied refund (must include name/position of employee)",
        usage: "This option is chosen when a hotel employee denies a refund, and the agent must include the name/position of the employee."
    },
    "Supplier Approved Refund": {
        reason: "agent receives approval from Rate Provider via phone or email request (if not full refund, specify amount being refunded to HotelPlanner)",
        usage: "This option is chosen when the agent receives approval from the Rate Provider via phone or email request. If it's not a full refund, specify the amount being refunded to HotelPlanner."
    },
    "Supplier Denied Refund": {
        reason: "Rate Provider declines refund request (specify reason if given by supplier)",
        usage: "This option is chosen when the Rate Provider declines a refund request. Specify the reason if given by the supplier."
    },
    "Check out Early/Late": {
        reason: "guest calls to request a change of dates (cancel/rebook opportunity)",
        usage: "This option is chosen when the guest calls to request a change of dates, providing a cancel/rebook opportunity."
    },
    "Needs to Cancel and Rebook": {
        reason: "guest requests modification to booking that cannot be done on HP platform",
        usage: "This option is chosen when the guest requests a modification to the booking that cannot be done on the HP (HotelPlanner) platform."
    },
    "Credit Card Issue": {
        reason: "guest informs us of any issue regarding their credit card (Virtual Card issues, misuse, double-billing, identity theft, etc.)",
        usage: "This option is chosen when the guest informs us of any issue regarding their credit card, including Virtual Card issues, misuse, double-billing, identity theft, etc."
    },
    "Refund Missing": {
        reason: "guest has not received a refund more than 10 days since email was sent to New Refunds by Tickets agent; refund was issued in FIT, but guest does not see it on credit card statement.",
        usage: "This option is chosen when the guest has not received a refund more than 10 days since the email was sent to New Refunds by Tickets agent. The refund was issued in FIT, but the guest does not see it on the credit card statement."
    },
    "Client Called to Confirm": {
        reason: "guest calls to confirm their booking; hotel should be contacted; if reservation not found, send immediately to Slack for Channel Manager to contact Rate Provider",
        usage: "This option is chosen when the guest calls to confirm their booking. The hotel should be contacted, and if the reservation is not found, send immediately to Slack for the Channel Manager to contact the Rate Provider."
    },
    "Occupancy Concern": {
        reason: "wrong number of adults/children listed on original booking (especially necessary for all-inclusive resorts and Europe/Asia bookings)",
        usage: "This option is chosen when there is a wrong number of adults/children listed on the original booking, especially necessary for all-inclusive resorts and Europe/Asia bookings."
    },
    "Hotel Quality Concern": {
        reason: "issues involving hotel amenities, cleanliness, safety, hotel service, etc.",
        usage: "This option is chosen when there are issues involving hotel amenities, cleanliness, safety, hotel service, etc."
    },
    "Disputed": {
        reason: "guest has filed a DISPUTE with their credit card company (amount disputed will show on FIT)",
        usage: "This option is chosen when the guest has filed a DISPUTE with their credit card company. The amount disputed will show on FIT (Financial Institution Transaction)."
    },
    "Requested Folio via Email": {
        reason: "agent requested folio from hotel (send to reservations@hotelplanner.com )",
        usage: "This option is chosen when the agent requested a folio from the hotel. The folio should be sent to reservations@hotelplanner.com."
    },
    "Receipt Needed": {
        reason: "guest requests an itemized receipt to be sent to them",
        usage: "This option is chosen when the guest requests an itemized receipt to be sent to them."
    },
    "Fraud": {
        reason: "guest claims their credit card was charged for a reservation they did not make or know about",
        usage: "This option is chosen when the guest claims their credit card was charged for a reservation they did not make or know about."
    },
    "Double Charged": {
        reason: "guest was charged more than one time for a booking (request screenshot of posted charges from credit card provider)",
        usage: "This option is chosen when the guest was charged more than one time for a booking. Request a screenshot of posted charges from the credit card provider."
    },
    "Price Review": {
        reason: "guest is questioning charge higher than expected or finding lower price elsewhere.",
        usage: "This option is chosen when the guest is questioning the charge higher than expected or finding a lower price elsewhere."
    },
};

let currentDisplayIndex = 0;
const rowsToShow = 4;

function findMatchingOptions(searchInput) {
    searchInput = searchInput.toLowerCase();
    const matchingOptions = Object.keys(optionsAndReasons).filter(option =>
        option.toLowerCase().includes(searchInput)
    );
    return matchingOptions.length > 0 ? matchingOptions : null;
}

function searchReason() {
    const searchInput = document.getElementById("searchInput").value;
    const reasonDisplay = document.getElementById("reasonDisplay");
    const usageDisplay = document.getElementById("usageDisplay");
    const nextButton = document.getElementById("nextButton");
    const refreshText = document.getElementById("refreshText");

    if (searchInput.trim() === "") {
        reasonDisplay.innerHTML = "Please enter an option.";
        usageDisplay.innerHTML = "";
        nextButton.style.display = "none";
        refreshText.style.display = "none";
    } else {
        const matchingOptions = findMatchingOptions(searchInput);
        if (matchingOptions) {
            reasonDisplay.innerHTML = "";
            usageDisplay.innerHTML = "";

            const endIndex = Math.min(currentDisplayIndex + rowsToShow, matchingOptions.length);
            matchingOptions.slice(currentDisplayIndex, endIndex).forEach(option => {
                const highlightedOption = `<span style="background-color: yellow;">Option:</span> ${option}`;
                const highlightedReason = highlightSearchTerm(optionsAndReasons[option].reason, searchInput);
                const highlightedUsage = highlightSearchTerm(optionsAndReasons[option].usage, searchInput);

                reasonDisplay.innerHTML += `${highlightedOption}<br><span style="background-color: yellow;">Reason:</span> ${highlightedReason}<br><br>`;
                usageDisplay.innerHTML += `${highlightedOption}<br><span style="background-color: yellow;">Usage:</span> ${highlightedUsage}<br><br>`;
            });

            nextButton.style.display = endIndex < matchingOptions.length ? "block" : "none";
            refreshText.style.display = "none";
        } else {
            reasonDisplay.innerHTML = `Option not found for "${searchInput}"`;
            usageDisplay.innerHTML = "";
            nextButton.style.display = "none";
            refreshText.style.display = "block";
        }
    }
}

function showNextRows() {
    currentDisplayIndex += rowsToShow;
    searchReason();
}

function highlightSearchTerm(text, searchTerm) {
    return text.replace(new RegExp(searchTerm, 'gi'), match => `<span style="color: red;">${match}</span>`);
}



