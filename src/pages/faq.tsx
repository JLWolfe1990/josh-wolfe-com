import {Layout} from "../components/Layout/Layout.tsx";
import {Pages} from "../types/Pages.ts";
import {Section} from "../components/Section/Section.tsx";
import {useState} from "react";

export function FaqPage() {
    const [currentSection, setCurrentSection] = useState('');
    return (
        <Layout page={Pages.FAQ} hasPageMargins={true}>
            <div className={`flex flex-col w-full h-full overflow-y-auto space-y-6`}>
                <Section
                    key={`technical-challenges`}
                    id={`technical-challenges`}
                    title={`What is a technical challenge you've faced and how did you solve it?`}
                    expanded={currentSection === 'technical-challenges'}
                    onClick={() => setCurrentSection(currentSection === 'technical-challenges' ? '' : 'technical-challenges')}
                >
                    <ol>
                        <li>
                            <h3><strong>Search Infrastructure</strong></h3>
                            <p>
                                When I was working at Coupa Software, I was tasked with updating the UI of the inventory search page.
                                However, no one on my team or any other team was able to run search in their local environment reliably,
                                and nearly 90% of developers were unable to run search locally at all.
                            </p>
                            <p>
                                After I identified the problem, I worked with the infrastructure team to port the deployment of the search
                                back to my development environment using Docker. Then I presented my findings to the SVP of Engineering.
                            </p>
                            <p>
                                My proposal was to create a new team that would be responsible for developer productivity so that our current
                                team could focus on the product. The environments would be managed centrally and we would have our own docker
                                hub to store images. This would allow us to have a single source of truth for all of our environments.
                            </p>
                        </li>
                        <li>
                            <h3><strong>Inventory Management System</strong></h3>
                            <p>
                                While working at Shop-Ware, I was in charge of the parts management system. The system
                                managed the inventory including parts that were on order, parts that were in stock, and
                                parts that were installed in vehicles but not yet billed. It also had a backend that you
                                could input your target gross profit margin and it would intelligently suggest parts
                                price markup.
                            </p>
                            <p>
                                In order to make the just-in-time inventory management system work, I had to integrate
                                with the scheduling system to determine what parts were needed for each job. I also had
                                to integrate with the parts ordering systems to notify it of when the parts were going
                                to be required.
                            </p>
                            <p>
                                When the parts were ready to be ordered, in integrated with three online parts ordering
                                systems and allowed the parts technician to order, receive and potentially return those
                                parts. Parts that were scheduled for a job would be automatically allocated to that
                                future job or marked as installed, then later billed. Parts that were for inventory
                                would be marked as in inventory or allocated for future jobs for shorted parts.
                            </p>
                            <p>
                                Some parts (like batteries) would have a core charge that would be refunded or not based
                                on whether the old part was returned. Those cores would also need to be accounted for in
                                inventory until the appropriate vendor picked up the core.
                            </p>
                            <p>
                                The system was able to tell the technician what parts were shorted for a 3-day and 5-day
                                projection.
                            </p>
                        </li>
                    </ol>
                </Section>
                <Section
                    key={`failure`}
                    id={`failure`}
                    title={`What is a failure you've experienced and what did you learn from it?`}
                    expanded={currentSection === 'failure'}
                    onClick={() => setCurrentSection(currentSection === 'failure' ? '' : 'failure')}
                >
                    <p>TBD</p>
                </Section>
                <Section
                    key={`project-lead`}
                    id={`project-lead`}
                    title={`Describe a recent project that you led. What were the challenges and successes?`}
                    expanded={currentSection === 'project-lead'}
                    onClick={() => setCurrentSection(currentSection === 'project-lead' ? '' : 'project-lead')}
                    >
                    <p>Calling</p>
                </Section>
                <Section
                    key={`strengths`}
                    id={`strengths`}
                    title={`What are your top 3 strengths?`}
                    expanded={currentSection === 'stengths'}
                    onClick={() => setCurrentSection(currentSection === 'strengths' ? '' : 'strengths')}
                >
                    <ol>
                        <li>
                            <h3><strong>Build and Maintain Strong Relationships</strong></h3>
                            <p>
                                I believe that building and maintaining strong relationships is the key to success in
                                any endeavor. I have been able to build strong relationships with my coworkers and
                                managers. Having relationships with my coworkers allows me to be more effective in my
                                job because most of the work that I do has cross-team dependencies.
                            </p>
                        </li>
                        <li>
                            <h3><strong>Detail Oriented</strong></h3>
                            <p>
                                I am detail oriented and I believe that the details matter. I have been able to
                                identify and fix many bugs and performance issues that would have otherwise gone unnoticed.
                            </p>
                            <p>
                                I extend this to the entire agile process. The earlier that you can identify a problem,
                                the more efficient the team can be. I have been using a hybrid Behavior Driven
                                Development (BDD) approach to help identify problems earlier in the process.
                            </p>
                        </li>
                        <li>
                            <h3><strong>Curiousity To Learn And Perfect My Craft</strong></h3>
                            <p>
                                I am always looking for ways to improve my craft. I am constantly learning new
                                technologies and techniques to improve my productivity and the quality of my work. This
                                might be learning a new design tool, a new programming language, or a new framework. I
                                like to work quickly, so Ruby on Rails has been my go-to framework for the past 10, but
                                I keep an eye on other frameworks and languages to see if they can improve my pace of
                                delivery.
                            </p>
                        </li>
                    </ol>
                </Section>
                <Section
                    key={`weaknesses`}
                    id={`weaknesses`}
                    title={`What are your top 3 weaknesses?`}
                    expanded={currentSection === 'weaknesses'}
                    onClick={() => setCurrentSection(currentSection === 'weaknesses' ? '' : 'weaknesses')}
                >
                    <ol>
                        <li>
                            <h3><strong>Too Excited To Begin</strong></h3>
                            <p>
                                I am too excited to begin working on a project. I have a tendency to jump right in
                                without fully understanding the problem. This can lead to wasted time and effort.
                            </p>
                            <p>
                                As a result, I have integrated a more thorough planning structure into my workflow.
                            </p>
                        </li>
                        <li>
                            <h3><strong>Too Much Attention To Detail</strong></h3>
                            <p>
                                I can be too detail oriented. I have a tendency to get lost in the details and lose sight
                                of the bigger picture especially when actively devloping a feature. Sometimes I will
                                spend too much time on a feature that is not as critical to the business and forget to
                                reconsider other potentially more simple solutions.
                            </p>
                            <p>
                                I identify this issue to my manager and ask for help to try to stay on track if they
                                feel that I am spending too much time on something. I try to highlight areas of
                                particular concern to get feedback early and often.
                            </p>
                        </li>
                        <li>
                            <h3><strong>Knit-picking</strong></h3>
                            <p>
                                I can be knit-picky. I have a tendency to get stuck on a particular issue and not let it
                                go quickly enough. This doesn't cause issues with relationships in the office because it
                                is not that bad, but I do have to keep it in mind during meetings to try to keep from
                                potentially derailing them.
                            </p>
                        </li>
                    </ol>
                </Section>
                <Section
                    key={`aspects-of-company`}
                    id={`aspects-of-company`}
                    title={`What are your top 3 important aspects of a company?`}
                    expanded={currentSection === 'aspects-of-company'}
                    onClick={() => setCurrentSection(currentSection === 'aspects-of-company' ? '' : 'aspects-of-company')}
                >
                    <ol>
                        <li>
                            <h3><strong>Comfortability With My team</strong></h3>
                            <p>
                                I believe that comfortability with my team is the most important aspect of a company.
                                I have been able to build strong relationships with my coworkers and managers. Having
                                relationships with my coworkers allows me to be more effective in my job because most
                                of the work that I do has cross-team dependencies.
                            </p>
                        </li>
                        <li>
                            <h3><strong>Believing In The Product</strong></h3>
                            <p>
                                The product is the focus of my everyday work. I need to believe in the product so that
                                I can be passionate about the work that I am doing. I have worked on products that I
                                did not believe in and it was difficult to stay motivated and deliver the level of value
                                to the customer and company that I would have liked.
                            </p>
                        </li>
                        <li>
                            <h3><strong>Technical Challenges</strong></h3>
                            <p>
                                I like to be challenged. I like to work on products that are technically challenging
                                and that allow me to grow as an engineer. I like to work with people that are smarter
                                than me so that I can learn from them and grow as an engineer.
                            </p>
                        </li>
                    </ol>
                </Section>
                <Section
                    key={`pride`}
                    id={`pride`}
                    title={`What are some projects that you are proud of?`}
                    expanded={currentSection === 'pride'}
                    onClick={() => setCurrentSection(currentSection === 'pride' ? '' : 'pride')}
                >
                    <ol>
                        <li>
                            <h3><strong>Calling Redesign</strong></h3>
                            <p>
                            </p>
                        </li>
                        <li>
                            <h3><strong>Parts Wizard</strong></h3>
                            <p>
                            </p>
                        </li>
                        <li>
                            <h3><strong>Behavior Driven Design Integration</strong></h3>
                            <p>
                            </p>
                        </li>
                    </ol>
                </Section>
                <Section
                    key={`conflict`}
                    id={`conflict`}
                    title={`When did you experience conflict in the office and how did you handle it?`}
                    expanded={currentSection === 'conflict'}
                    onClick={() => setCurrentSection(currentSection === 'conflict' ? '' : 'conflict')}
                >
                    <p>
                        <strong>Situation:</strong>
                        When I was the Tech Lead at Hello Alice, one of my team members was getting mad at me in
                        meetings while we were discussion how to solve technical problems. After the third meeting, I
                        reached out to her to schedule a 1:1 to discuss why she was getting upset. During that 1:1, we
                        determined that she was getting upset because she felt that the team as a whole was not
                        listening to her ideas.
                    </p>
                    <p>
                        <strong>Task:</strong>
                        I needed to find a way to make her feel heard and valued.
                    </p>
                    <div>
                        <strong>Action:</strong>
                        <ol>
                            <li>
                                Start doing weekly 1:1s with her as check-ins to make sure that progress is being made
                                on my part based on the other action items.
                            </li>
                            <li>
                                Foster a more inclusive environment where each voice is heard with out interruption.
                            </li>
                            <li>
                                Allow her more space to speak during meetings by directly asking her what she thinks
                                if I notice that she hasn't given her opinion.
                            </li>
                        </ol>
                    </div>
                    <div>
                        <h3><strong>Result:</strong></h3>
                        After the first 1:1, she felt heard and valued. Her demiener in meetings changed and she was
                        much more engaged. She was also more willing to speak up in meetings. After about 6 weeks of
                        1:1 meetings, we went down to bi-weekly meetings and then eventually stopped them all together.
                        The issue was completely resolved and she still works with me when she stumbles into similar
                        situations on new teams even though neither of us are at that company anymore.
                    </div>
                </Section>
                <Section
                    key={`leadership`}
                    id={`leadership`}
                    title={`What is a situation where you demonstrated leadership?`}
                    expanded={currentSection === 'leadership'}
                    onClick={() => setCurrentSection(currentSection === 'leadership' ? '' : 'leadership')}
                >
                    <div>
                        <h3><strong>Situation:</strong></h3>

                        We were working on fixing a bug for a large customer. The bug was causing the customer to lose
                        faith in the product during their trial period. In order to fix the bug, we determined that we
                        needed to do a data migration to fix imported parts data.
                        <br />
                        However, the bug was incorrectly identified and we applied an incorrect fix to the data. Lots of
                        development time was lost and the customer was still having issues.
                        <br />
                        I personally ended up finding the issue, but the product lead complained about it in the
                        retrospective meeting. I felt like the product lead was correct that we could have done better.
                    </div>
                    <div>
                        <h3><strong>Task:</strong></h3>
                        I needed to find a way to prevent this from happening again.
                    </div>
                    <div>
                        <h3><strong>Action:</strong></h3>
                        <ol>
                            <li>
                                I figured out how the incorrect fix was applied and how we missed it in the first place.
                            </li>
                            <li>
                                I determined that the issue was the the investigation was not thorough enough because
                                we were rushed to appease the client.
                            </li>
                            <li>
                                I developed the 5Ws + H (5Ws for short) system for investigating bugs and issues (Who, What, When, Where,
                                Why).
                            </li>
                            <li>
                                I documented the 5Ws system to the team and we agreed to use it going forward.
                            </li>
                        </ol>
                    </div>
                    <div>
                        <h3><strong>Result:</strong></h3>
                        The 5Ws system was used by the team for the remainder of my time at Shop-Ware. It was also used
                        by the team at Hello Alice after I put it in place there.
                        <br />
                        That system is particularly helpful because it forces the developers to understand why the bug
                        was designed in the way that it was. This helps to make sure that the original use case is also
                        accounted for in the fix rather than just resolving the reported problem.
                    </div>
                </Section>
            </div>
        </Layout>
    );
}