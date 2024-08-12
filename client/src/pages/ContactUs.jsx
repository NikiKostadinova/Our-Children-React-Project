

export default function ContactUs() {

    return (
        <div className="contact-form">
            <h2>Contact Us</h2>
            <form action="https://formspree.io/f/xnnavooj"
                method="POST">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" required />

                <label htmlFor="message">Message:</label>
                <textarea name="message" required></textarea>

                <button type="submit">Send</button>
            </form>

            {status === 'SUCCESS' && <p>Thanks for your message! We will be in touch soon.</p>}
            {status === 'ERROR' && <p>Oops! There was an error. Please try again.</p>}
        </div>
    );
}
