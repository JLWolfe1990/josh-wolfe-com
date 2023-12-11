import {Layout} from "../components/Layout/Layout.tsx";
import {PaginatedContent} from "../components/PaginatedContent/PaginatedContent.tsx";
import {PaginatedBody} from "../components/PaginatedBody/PaginatedBody.tsx";
import {PageSelector} from "../components/PageSelector/PageSelector.tsx";
import {SkillTypes} from "../types/SkillTypes";
import {useState} from "react";
import {ListTable} from "../components/ListTable/ListTable.tsx";
import {ListTableItem} from "../components/ListTable/ListTableItem.tsx";
import {Pages} from "../types/Pages.ts";

export function SkillsPage() {
    const pages: SkillTypes[] = [
        SkillTypes.Languages,
        SkillTypes.Frameworks,
        SkillTypes.ParadigmsAndPatterns,
        SkillTypes.DevOps,
        SkillTypes.BusinessAndManagement
    ];
    const [currentPage, setCurrentPage] = useState(SkillTypes.Languages);

    return (
        <Layout key={Pages.Skills} page={Pages.Skills} hasPageMargins={true}>
            <PaginatedContent>
                <PaginatedBody visible={currentPage === SkillTypes.Languages}>
                    <ListTable headers={['Name of Skill', 'Beginner | Intermediate | Advanced']}>
                        <ListTableItem values={
                            {
                                'Ruby': 'Advanced',
                                'JavaScript': 'Advanced',
                                'TypeScript': 'Advanced',
                                'HTML': 'Advanced',
                                'CSS': 'Advanced',
                                'SQL': 'Advanced',
                                'GraphQL': 'Beginner',
                                'Java': 'Intermediate',
                                'Elixir': 'Beginner',
                                'Bash': 'Beginner',
                            }
                        } />
                    </ListTable>
                </PaginatedBody>
                <PaginatedBody visible={currentPage === SkillTypes.Frameworks}>
                    <ListTable headers={['Name of Skill', 'Beginner | Intermediate | Advanced']}>
                        <ListTableItem values={
                            {
                                'Ruby on Rails': 'Advanced',
                                'Backbone.js': 'Advanced',
                                'React (JS)': 'Advanced',
                                'React Native': 'Intermediate',
                                'Ember.js': 'Intermediate',
                                'Tailwind CSS': 'Advanced',
                                'Phoenix (Elixir)': 'Intermediate',
                            }
                        } />
                    </ListTable>
                </PaginatedBody>
                <PaginatedBody visible={currentPage === SkillTypes.ParadigmsAndPatterns}>
                    <ListTable headers={['Name of Skill', 'Beginner | Intermediate | Advanced']}>
                        <ListTableItem values={
                            {
                                'Object Oriented Development': 'Advanced',
                                'RESTful API Design': 'Advanced',
                                'Agile Development': 'Advanced',
                                'Behavior Driven Development': 'Advanced',
                                'Test Driven Development': 'Advanced',
                                'Model View Controller (MVC)': 'Advanced',
                                'Monolithic Architecture': 'Advanced',
                                'Service Based Architecture': 'Intermediate',
                                'Event Based Architecture': 'Intermediate',
                                'Functional Programming': 'Intermediate',
                            }
                        } />
                    </ListTable>
                </PaginatedBody>
                <PaginatedBody visible={currentPage === SkillTypes.DevOps}>
                    <ListTable headers={['Name of Skill', 'Beginner | Intermediate | Advanced']}>
                        <ListTableItem values={
                            {
                                'Git': 'Advanced',
                                'AWS': 'Advanced*',
                                'Heroku': 'Advanced',
                                'Docker': 'Intermediate',
                                'New Relic': 'Intermediate',
                                'CircleCI': 'Intermediate',
                                'TravisCI': 'Intermediate',
                                'Heroku Pipelines': 'Intermediate',
                                'Sentry': 'Intermediate',
                                'Cloudwatch': 'Beginner',
                                'Papertrail': 'Intermediate',
                                'Jenkins': 'Intermediate',
                                'Librato': 'Intermediate',
                                'Chef': 'Beginner',
                            }
                        } />
                    </ListTable>
                </PaginatedBody>
                <PaginatedBody visible={currentPage === SkillTypes.BusinessAndManagement}>
                    <ListTable headers={['Name of Skill', 'Beginner | Intermediate | Advanced']}>
                        <ListTableItem values={
                            {
                                'Figma': 'Advanced',
                                'Microsoft Office Products': 'Advanced',
                            }
                        } />
                    </ListTable>
                </PaginatedBody>
                <PageSelector
                    currentPage={currentPage}
                    pages={pages}
                    setCurrentPage={setCurrentPage} />
            </PaginatedContent>
        </Layout>
    )
}