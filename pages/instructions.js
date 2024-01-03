import Head from 'next/head';
import Link from 'next/link';

const Instructions = () => {
    return (
        <div className="container mt-5">
            <Head>
                <title>Instructions - Astra</title>
            </Head>

            <div className="row">
                <div className="col">
                    <h1 className="mb-4 text-center">Instructions</h1>
                    <div className="mb-4">
                        <p>Hey, there!</p>
                        <p>We saw a lot of feedback over an year regarding Astra, so I just want to answer the most asked questions.</p>
                    </div>

                    <div className="mb-4">
                        <h5>Guidelines for using Astra, and responses to the feedbacks:</h5>
                        <ol className='py-2 instructions'>
                            <li>Enter your JNTU Roll No. (<span class="imp">21BD1AXXXX</span>) in the field provided. If it says Roll No. doesn&apos;t exist, please enter your Roll No., and Netra ID in &quot;<Link href={'/netra'}><span className='imp imp-link'>Add your Roll No. Here</span></Link>&quot; Link provided below the Homepage.</li>
                            <li>If you&apos;ve entered an incorrect Roll No. or Netra ID, submit the feedback form with the correct details for update.</li>
                            <li>Click &quot;<span className="imp">Remember Me</span>&quot; after entering your Roll No. to save it, eliminating manual entry every time.</li>
                            <li>The Attendance shown is <span class="imp">READ ONLY</span>, we cannot edit!!</li>
                            <li>Detailed analysis of the Attendance data is not possible, because of the limitations of Netra, as we rely on them for attendance.</li>
                            <li>Astra shows Netra&apos;s attendance, not its own; Astra is not responsible for the data shown.</li>
                            <li>The main motive of Astra is to see the Attendance Percentage, without logging in each time into Netra.</li>
                            <li>Misuse of Astra is <span class="imp">strictly not tolerated</span>.</li>
                            <li>This unofficial app is <span class="imp">not endorsed by the management</span>; refrain from sharing it with faculty for concerns.</li>
                            <li>We value feedback and continue to add useful features; thank you for your contributions.</li>
                            <li>Astra aims to improve <span class="imp">ease of access</span> of attendance, not for data resale or misuse.</li>
                            <li>Regarding UI concerns, Astra is intentionally designed with a simple interface, not to over complicate things.</li>

                        </ol>
                    </div>

                    <div className="mb-4">
                        <blockquote className="blockquote">
                            <p className="mb-5">
                                <span className='imp text-decoration-underline'>Note:</span> We are nowhere responsible for your absence or attendance, just because it is shown.
                            </p>
                            <footer className="blockquote-footer">In a further release, an issue forum is being introduced, along with new features.</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
