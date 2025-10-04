var cTag = null

function go_to(tag, force = true) {
    if (cTag == tag) {
        return
    }
    cTag = tag
    if (force) {
        $('html, body').stop().animate({
            scrollTop: $("#" + tag).offset().top
        }, 500);
    }
    $("nav .active").removeClass("active");
    $(`a[href='/` + "#" + tag + `']`).parent().addClass("active");
}

$("a").on("click", function(e) {
    var href = $(this).attr("href")
    if (href.split("#").length == 2) {
        e.preventDefault()
    }
    go_to(href.split("#")[1])
})
if (window.location.href.split("#")[1]) {
    var tag = window.location.href.split("#")[1]
    go_to(tag)
} else {
    go_to("home")
}
var end = false

$(document).ready(function() {
    $("#home p").text(``)
    $("#contact_form").submit(function(event) {
        event.preventDefault();
        if (end) {
            return
        }
        $("button[type='submit']").text("Sending...")
        end = true
        var formData = $(this).serialize();

        var URL = `https://l.webhook.party/hook/---replace`;

        $.ajax({
            url: URL,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                content: `**Ime:** ${$("#name").val()}\n**Email:** ${$("#email").val()}\n**Poruka:** ${$("#message").val()}`
            }),
            success: function(response) {
                $("form input, form textarea").attr("disabled", true)
                $("button[type='submit']").text("Message sent! ^-^")
                $("button[type='submit']").addClass("act")
                $("#contact_form").trigger("reset");
            }
        });
    });
});



$(window).scroll(function() {
    var scrollPosition = $(this).scrollTop();
    var sections = [
        {id: "home",element: $("#home")},
        {id: "thumbnails",element: $("#thumbnails")},
        {id: "websites",element: $("#websites")},
        {id: "skills",element: $("#skills")},
        //{id: "about",element: $("#about")},
        //{id: "feedback",element: $("#feedback")},
        {id: "contact",element: $("#contact")}
    ];

    for (var i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].element.offset().top - 50) {
            go_to(sections[i].id, false);
            break;
        }
    }
});

$("#websites .projects .project").on("click", function() {
    $(this).find(".preview").slideToggle(300)
})

$(".thumbs .project").on("click", function() {
    $(this).find(".photos").slideToggle(300)
})

$(".thumbs .project img").on("click", function(e) {
    e.stopPropagation()
    var src = $(this).attr("src")
    var popup = $(
        '<div id="img-popup" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 9999;">' +
        '<img src="' + src + '" style="max-width: 90vw; max-height: 90vh; box-shadow: 0 0 10px black; cursor: pointer;">' +
        '</div>'
    )
    $("body").append(popup)
    $("#img-popup").on("click", function() {
        $(this).remove()
    })
})

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; 
        this.speedX = (Math.random() - 0.5) * 0.5; 
        this.speedY = (Math.random() - 0.5) * 0.5; 
        this.color = 'rgba(138,43,226,0.8)'; // svetlo purple
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

// Kreiranje 100 particles
for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

function copyWallet(type) {
    let text = "";
    let coinName = "";

    if (type === "btc") {
        text = document.getElementById('btc-address').textContent;
        coinName = "BTC";
    } else if (type === "eth") {
        text = document.getElementById('eth-address').textContent;
        coinName = "ETH";
    }

    if (text !== "") {
        navigator.clipboard.writeText(text).then(() => {
            const toast = document.getElementById('copy-toast');
            toast.textContent = coinName + " copied!";
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 1500);
        });
    }
}








