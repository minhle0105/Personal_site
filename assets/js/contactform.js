window.addEventListener("DOMContentLoaded", function () {
    // get the form elements defined in your form HTML above

    let form = document.getElementById("contact_form");
    let status = document.getElementById("result");

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        status.classList.add("success");
        status.innerHTML = "Thanks! I will be in touch soon!";
        setTimeout(clearMessage, 3000);
    }

    function clearMessage() {
        status.innerHTML = "";
    }

    function error() {
        status.classList.add("error");
        status.innerHTML = "Cannot send! Try Again!";
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        let data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}
