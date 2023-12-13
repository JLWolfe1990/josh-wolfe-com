import {Layout} from "../components/Layout/Layout.tsx";
import {Pages} from "../types/Pages.ts";
import {Section} from "../components/Section/Section.tsx";
import {useState} from "react";

export function ExperiencePage() {
    const [currentSection, setCurrentSection] = useState('svmx');
    return (
        <Layout page={Pages.Experience} hasPageMargins={true}>
            <div className={`flex flex-col w-full h-full overflow-y-auto space-y-6`}>
                <Section
                    key={`svmx`}
                    id={`svmx`}
                    title={`Senior Full-Stack Software Engineer`}
                    subtitle={`ServiceMax by PTC, Inc.`}
                    date={`05/2021 - Present`}
                    expanded={currentSection === 'svmx'}
                    onClick={() => setCurrentSection(currentSection === 'svmx' ? '' : 'svmx')}
                >
                    <p>Technical Scope: 100% Development</p>
                    <br/>
                    <p>
                        Worked in a face paced, agile environment on the Zinc chat application. Architect a new full-stack calling
                        experience to service 60k users and integrate with a legacy calling infrastructure using the Twilio SDK. Help
                        design, implement, deliver and harden a brand new React Native chat client. Lead the cross-functional
                        development effort to integrate the Rails backend with Salesforce to optimize client onboarding. Prevalent
                        technologies include: Ruby on Rails v6, React Native, Backbone.js Ember.js, PostgeSQL.
                    </p>
                </Section>
                <Section
                    key={`pattern`}
                    id={`pattern`}
                    title={`Senior Back-End Software Engineer`}
                    subtitle={`Pattern (Contract)`}
                    date={`02/2021 - 05/2021`}
                    expanded={currentSection === 'pattern'}
                    onClick={() => setCurrentSection(currentSection === 'pattern' ? '' : 'pattern')}
                    >
                    <p>Technical Scope: 100% Green Field Development</p>
                    <br/>
                    <div>
                        Complete a Ruby on Rails API for managing a Product Catalog. Features included:
                        <ul>
                            <li>Overall project architecture</li>
                            <li>Authentication</li>
                            <li>Bulk upload and download</li>
                            <li>Product searching</li>
                        </ul>
                    </div>
                </Section>
                <Section
                    key={`dispatchbot`}
                    id={`dispatchbot`}
                    title={`Director of Software Development`}
                    subtitle={`DispatchBot`}
                    date={`01/2021 - 02/2021`}
                    expanded={currentSection === 'dispatchbot'}
                    onClick={() => setCurrentSection(currentSection === 'dispatchbot' ? '' : 'dispatchbot')}
                >
                    <p>Technical Scope: 90% Development | 10% Management</p>
                    <br/>
                    <p>
                        (Laid off from Covid) Split out the main revenue source of the company to improve its reliability. Managed
                        a team of two. Restructured JIRA, New Relic and Docker.
                    </p>
                </Section>
                <Section
                    key={`helloAlice`}
                    id={`helloAlice`}
                    title={`Tech Lead`}
                    subtitle={`Hello Alice`}
                    date={`05/2020 - 12/2020`}
                    expanded={currentSection === 'helloAlice'}
                    onClick={() => setCurrentSection(currentSection === 'helloAlice' ? '' : 'helloAlice')}
                >
                    <p>Technical Scope: Tech Lead</p>
                    <br/>
                    <p>
                        Worked in a rapidly growing startup in the midst of rapidly hiring while simultaneously hardening the
                        product. Mentored mid and senior level developers on best practices, architecture, project management
                        and leadership skills. Managed all DevOps projects with tools such as Docker, New Relic, Elasticsearch,
                        AWS ECS, AWS ECR, AWS CodePipeline CI/CD, security and more. Contributed highly to backend
                        improvements, versioned RESTful APIs, code reviews and hiring.
                    </p>
                </Section>
                <Section
                    key={`hotelEngine`}
                    id={`hotelEngine`}
                    title={`Senior Software Engineer`}
                    subtitle={`Hotel Engine`}
                    date={`02/2020 - 03/2020`}
                    expanded={currentSection === 'hotelEngine'}
                    onClick={() => setCurrentSection(currentSection === 'hotelEngine' ? '' : 'hotelEngine')}
                >
                    <p>Technical Scope: Senior Ruby on Rails Engineer and Mentor</p>
                    <br/>
                    <p>
                        (Laid off from Covid) Worked in an up-and-coming startup in the hospitality space doubling year over year.
                        Mentored junior and mid-level developers on best practices and architecture. Contributed highly on bugs,
                        features, sprint cycle management and developer operations.
                    </p>
                </Section>
                <Section
                    key={`coupa`}
                    id={`coupa`}
                    title={`Senior Software Engineer`}
                    subtitle={`Coupa`}
                    date={`03/2019 - 01/2020`}
                    expanded={currentSection === 'coupa'}
                    onClick={() => setCurrentSection(currentSection === 'coupa' ? '' : 'coupa')}
                >
                    <p>Technical Scope: Ruby on Rails Enterprise Development</p>
                    <br/>
                    <p>
                        Worked in a faced paced large enterprise procurement application responsible for 70% of revenue.
                        Revolutionized bug life cycle management. Proposed developer infrastructure changes to optimize
                        productivity. Collaborated with cross functional teams to successfully deliver features and bug fixes.
                    </p>
                    <div>
                        Key Achievements:
                        <ul>
                            <li>
                                Pioneered and introduced a new workflow to revolutionize bug ticket life cycle
                            </li>
                            <li>
                                Proposed a plan for developer infrastructure changes to streamline company development
                                platforms
                            </li>
                            <li>
                                Worked cross functionally with many departments to gather requirements, coordinate
                                stakeholders, and deliver reliable features
                            </li>
                        </ul>
                    </div>
                </Section>
                <Section
                    key={`shopWare`}
                    id={`shopWare`}
                    title={`Senior Software Engineer`}
                    subtitle={`Shop-Ware`}
                    date={`03/2016 - 02/2019`}
                    expanded={currentSection === 'shopWare'}
                    onClick={() => setCurrentSection(currentSection === 'shopWare' ? '' : 'shopWare')}
                >
                    <p>Technical Scope: Ruby on Rails Development</p>
                    <br/>
                    <p>
                        Led junior and mid-level developers on a daily basis, training on best practices for testing and software
                        development. Supervised development team execution of third-party integrations and API version
                        maintenance. Engineered improved features within SaaS modules with real-time components including
                        customer management, financial management, inventory management, and scheduling. Maximized daily
                        operations by quickly troubleshooting error metrics and performance problems. Designed an advanced
                        database architecture using single table inheritance and polymorphic relationships.
                    </p>
                    <div>
                        Key Achievements:
                        <ul>
                            <li>
                                Controlled 30% product ownership share, spearheading innovation of the enterprise application’s
                                most challenging features
                            </li>
                            <li>
                                Managed the AM production environment for two years, coordinating a team that handled
                                troubleshooting of data integrity issues, hotfixes, and devops
                            </li>
                            <li>
                                Built a large-scale architecture refractor with over 250 files and a 150 line data repair migration
                            </li>
                        </ul>
                    </div>
                </Section>
                <Section
                    key={`accelerateLearning`}
                    id={`accelerateLearning`}
                    title={`Senior Software Engineer`}
                    subtitle={`Accelerate Learning Inc.`}
                    date={`05/2015 - 03/2016`}
                    expanded={currentSection === 'accelerateLearning'}
                    onClick={() => setCurrentSection(currentSection === 'accelerateLearning' ? '' : 'accelerateLearning')}
                >
                    <p>Technical Scope: Ruby on Rails Development</p>
                    <br/>
                    <p>
                        Sustained highly distributed client facing system with multi-tenant features. Performed research and
                        development to support a shared curriculum database model structure. Improved team results utilizing
                        polyglot. Initiated cross department collaboration with multiple development teams.
                    </p>
                    <div>
                        Key Achievements:
                        <ul>
                            <li>
                                Developed rails application for implementing uniform academic standards across all 50-states
                            </li>
                            <li>
                                Collaborated with project managers to assess timelines and prioritize features and bugs
                            </li>
                        </ul>
                    </div>
                </Section>
                <Section
                    key={`erdosMiller`}
                    id={`erdosMiller`}
                    title={`Senior Software Engineer`}
                    subtitle={`Erdos Miller`}
                    date={`05/2014 - 05/2015`}
                    expanded={currentSection === 'erdosMiller'}
                    onClick={() => setCurrentSection(currentSection === 'erdosMiller' ? '' : 'erdosMiller')}
                >
                    <p>Technical Scope: Ruby on Rails Development and Lead</p>
                    <br/>
                    <p>
                        Led intricate API design and technical management for 3 desktop clients. Fostered first-rate service by
                        facilitating weekly client meetings and live demonstrations. Shaped client relationships through on-site
                        service three days a week for 12 months. Engineered a distributed real time automated oil drilling
                        monitoring system and damage building module. Developed a real-time AngularJS front-end comprised of
                        instant updates over various web browsers.
                    </p>
                    <div>
                        Key Achievements:
                        <ul>
                            <li>
                                Directed a team of 5 firmware and software developers handling multiple projects
                            </li>
                            <li>
                                Sold $1.5 million in add-on software sales from a key client
                            </li>
                        </ul>
                    </div>
                </Section>
                <Section
                    key={`iberon`}
                    id={`iberon`}
                    title={`Junior Software Engineer`}
                    subtitle={`Iberon, LLC`}
                    date={`05/2012 - 02/2014`}
                    expanded={currentSection === 'iberon'}
                    onClick={() => setCurrentSection(currentSection === 'iberon' ? '' : 'iberon')}
                >
                    <p>Technical Scope: Ruby on Rails Development, FreeSwitch, Java (Spring Framework)</p>
                    <br/>
                    <p>
                        Formulated and instituted a background payment processor notification for automated credit card
                        payments and ACH. Imported, monitored, and managed a substantial database of collections accounts.
                        Launched a call monitoring software based on the FreeSwitch phone subsystem. Maintained remote
                        operations features valued at $2 million.
                    </p>
                    <div>
                        Key Achievements:
                        <ul>
                            <li>
                                Designed an ACH billing system featuring in-depth front-end reporting, back-end reconciliation,
                                email notifications, and automatic error handling.
                            </li>
                            <li>
                                Accelerated workplace productivity by implementing a call time report which substantially reduced
                                downtime between calls.
                            </li>
                        </ul>
                    </div>
                </Section>
            </div>
        </Layout>
    );
}