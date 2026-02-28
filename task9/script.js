$(document).ready(function () {

    const formJSON = {
        fields: [
            { label: "Full Name", type: "text", id: "name", required: true },
            { label: "Email", type: "email", id: "email", required: true },
            { label: "Password", type: "password", id: "password", required: true },
            {
                label: "Country",
                type: "select",
                id: "country",
                required: true,
                options: ["India", "USA", "Canada"]
            }
        ]
    };

    function buildForm() {
        let form = $("<form></form>");

        formJSON.fields.forEach(field => {

            form.append(`<label>${field.label}</label>`);

            if (field.type === "select") {
                let select = $(`<select id="${field.id}"></select>`);
                select.append(`<option value="">Select ${field.label}</option>`);

                field.options.forEach(opt => {
                    select.append(`<option value="${opt}">${opt}</option>`);
                });

                form.append(select);
            } else {
                form.append(`<input type="${field.type}" id="${field.id}">`);
            }

            form.append(`<div class="error" id="${field.id}Error"></div>`);
        });

        form.append(`<div id="extraFields"></div>`);
        form.append(`<button type="submit">Register</button>`);

        $("#formContainer").html(form);
    }

    buildForm();

    // Conditional Fields
    $(document).on("change", "#country", function () {
        let country = $(this).val();
        let extra = $("#extraFields");
        extra.hide().empty();

        if (country === "USA") {
            extra.append(`
                <label>State</label>
                <select id="state">
                    <option value="">Select State</option>
                    <option>California</option>
                    <option>Texas</option>
                    <option>Florida</option>
                </select>
                <div class="error" id="stateError"></div>
            `);
        }

        if (country === "India") {
            extra.append(`
                <label>City</label>
                <input type="text" id="city">
                <div class="error" id="cityError"></div>
            `);
        }

        extra.slideDown();
    });

    // Real-time validation
    $(document).on("blur", "input", function () {
        validateField($(this).attr("id"));
    });

    function validateField(id) {
        let value = $("#" + id).val().trim();

        if (id === "name" && value === "") {
            $("#" + id + "Error").text("Name required");
        }
        else if (id === "email" && !value.includes("@")) {
            $("#" + id + "Error").text("Valid email required");
        }
        else if (id === "password" && value.length < 6) {
            $("#" + id + "Error").text("Minimum 6 characters");
        }
        else {
            $("#" + id + "Error").text("");
        }
    }

    // Submit Validation
    $(document).on("submit", "form", function (e) {
        e.preventDefault();

        let valid = true;
        $(".error").text("");

        $("input, select").each(function () {
            let id = $(this).attr("id");
            validateField(id);
            if ($("#" + id + "Error").text() !== "") {
                valid = false;
            }
        });

        let country = $("#country").val();

        if (country === "USA" && $("#state").val() === "") {
            $("#stateError").text("Select state");
            valid = false;
        }

        if (country === "India" && $("#city").val().trim() === "") {
            $("#cityError").text("City required");
            valid = false;
        }

        if (valid) {
            alert("Registration Successful!");
        }
    });

});