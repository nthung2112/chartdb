import type { RouteObject } from 'react-router-dom';
import { createHashRouter } from 'react-router-dom';
import {
    TemplatePage,
    type TemplatePageLoaderData,
} from './pages/template-page/template-page';
import type { TemplatesPageLoaderData } from './pages/templates-page/templates-page';
import { getTemplatesAndAllTags } from './templates-data/template-utils';

import { EditorPage } from './pages/editor-page/editor-page';
import { ExamplesPage } from './pages/examples-page/examples-page';
import { TemplatesPage } from './pages/templates-page/templates-page';
import { CloneTemplatePage } from './pages/clone-template-page/clone-template-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { templates } from './templates-data/templates-data';

const routes: RouteObject[] = [
    ...['', 'diagrams/:diagramId'].map((path) => ({
        path,
        Component: EditorPage,
    })),
    {
        path: 'examples',
        Component: ExamplesPage,
    },
    {
        id: 'templates',
        path: 'templates',
        Component: TemplatesPage,

        loader: async (): Promise<TemplatesPageLoaderData> => {
            const { tags, templates } = await getTemplatesAndAllTags();

            return {
                allTags: tags,
                templates,
            };
        },
    },
    {
        id: 'templates_featured',
        path: 'templates/featured',
        Component: TemplatesPage,
        loader: async (): Promise<TemplatesPageLoaderData> => {
            const { tags, templates } = await getTemplatesAndAllTags({
                featured: true,
            });

            return {
                allTags: tags,
                templates,
            };
        },
    },
    {
        id: 'templates_tags',
        path: 'templates/tags/:tag',
        Component: TemplatesPage,
        loader: async ({ params }): Promise<TemplatesPageLoaderData> => {
            const { tags, templates } = await getTemplatesAndAllTags({
                tag: params.tag?.replace(/-/g, ' '),
            });

            return {
                allTags: tags,
                templates,
            };
        },
    },
    {
        id: 'templates_templateSlug',
        path: 'templates/:templateSlug',
        Component: TemplatePage,
        loader: async ({ params }): Promise<TemplatePageLoaderData> => {
            return {
                template: templates.find(
                    (template) => template.slug === params.templateSlug
                ),
            };
        },
    },
    {
        id: 'templates_load',
        path: 'templates/clone/:templateSlug',
        Component: CloneTemplatePage,
        loader: async ({ params }) => {
            return {
                template: templates.find(
                    (template) => template.slug === params.templateSlug
                ),
            };
        },
    },
    {
        path: '*',
        Component: NotFoundPage,
    },
];

export const router = createHashRouter(routes, {
    basename: '/',
});
