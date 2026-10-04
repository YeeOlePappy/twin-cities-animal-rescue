// =========================================
// Twin Cities Animal Rescue
// Touchstone Task 4 - JavaScript
// =========================================

// ---------- Data ----------

const rescuePets = [
    {
        name: "Buddy",
        type: "Dog",
        description: "A friendly dog looking for a loving home."
    },
    {
        name: "Luna",
        type: "Cat",
        description: "A gentle cat who enjoys a calm environment."
    },
    {
        name: "Max",
        type: "Dog",
        description: "An energetic dog ready for an active family."
    }
];

const interestOptions = [
    "Adoption",
    "Volunteering",
    "Fostering"
];

// ---------- Home Page Feature ----------

function displayPets() {
    const petContainer = document.getElementById("pet-interest");

    if (!petContainer) {
        return;
    }

    petContainer.innerHTML = "";

    rescuePets.forEach(function (pet) {
        const petCard = document.createElement("article");

        petCard.innerHTML = `
            <h3>${pet.name}</h3>
            <p><strong>Type:</strong> ${pet.type}</p>
            <p>${pet.description}</p>
            <button type="button" data-pet="${pet.name}">
                I'm Interested
            </button>
        `;

        petContainer.appendChild(petCard);
    });
}

function savePetInterest(petName) {
    localStorage.setItem("selectedPet", petName);
}

function showSelectedPet(petName) {
    const result = document.getElementById("interest-result");

    if (result) {
        result.textContent =
            `You selected ${petName}. Thank you for your interest in adoption!`;
    }
}

function loadSavedPet() {
    const savedPet = localStorage.getItem("selectedPet");

    if (savedPet) {
        showSelectedPet(savedPet);
    }
}

function handlePetSelection(event) {
    if (event.target.matches("[data-pet]")) {
        const petName = event.target.dataset.pet;

        savePetInterest(petName);
        showSelectedPet(petName);
    }
}

function initializePetFeature() {
    const petContainer = document.getElementById("pet-interest");

    if (!petContainer) {
        return;
    }

    displayPets();
    loadSavedPet();

    petContainer.addEventListener("click", handlePetSelection);
}

// ---------- Contact Form Validation ----------

function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);

    if (errorElement) {
        errorElement.textContent = message;
    }

    field.setAttribute("aria-invalid", "true");
}

function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);

    if (errorElement) {
        errorElement.textContent = "";
    }

    field.removeAttribute("aria-invalid");
}

function validateName(nameField) {
    if (nameField.value.trim() === "") {
        showError(nameField, "Please enter your name.");
        return false;
    }

    if (nameField.value.trim().length < 2) {
        showError(nameField, "Name must be at least 2 characters long.");
        return false;
    }

    clearError(nameField);
    return true;
}

function validateEmail(emailField) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailField.value.trim() === "") {
        showError(emailField, "Please enter your email address.");
        return false;
    }

    if (!emailPattern.test(emailField.value.trim())) {
        showError(emailField, "Please enter a valid email address.");
        return false;
    }

    clearError(emailField);
    return true;
}

function validateMessage(messageField) {
    if (messageField.value.trim() === "") {
        showError(messageField, "Please enter a message.");
        return false;
    }

    if (messageField.value.trim().length < 10) {
        showError(messageField, "Message must be at least 10 characters long.");
        return false;
    }

    clearError(messageField);
    return true;
}

function validateContactForm(event) {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    const nameValid = validateName(nameField);
    const emailValid = validateEmail(emailField);
    const messageValid = validateMessage(messageField);

    if (!nameValid || !emailValid || !messageValid) {
        event.preventDefault();
        return;
    }

    saveContactName(nameField.value.trim());
}

// ---------- Contact Form Storage ----------

function saveContactName(name) {
    localStorage.setItem("contactName", name);
}

function loadContactName() {
    const nameField = document.getElementById("name");

    if (!nameField) {
        return;
    }

    const savedName = localStorage.getItem("contactName");

    if (savedName) {
        nameField.value = savedName;
    }
}

// ---------- Contact Form Setup ----------

function initializeContactForm() {
    const form = document.querySelector("form");

    if (!form) {
        return;
    }

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    if (!nameField || !emailField || !messageField) {
        return;
    }

    form.addEventListener("submit", validateContactForm);

    nameField.addEventListener("input", function () {
        validateName(nameField);
    });

    emailField.addEventListener("input", function () {
        validateEmail(emailField);
    });

    messageField.addEventListener("input", function () {
        validateMessage(messageField);
    });

    loadContactName();
}

// ---------- Start JavaScript ----------

document.addEventListener("DOMContentLoaded", function () {
    initializePetFeature();
    initializeContactForm();
});