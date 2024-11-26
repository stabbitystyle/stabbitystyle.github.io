import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('posts');
    posts.sort((a, b) => Date.parse(b.data.pubDate) - Date.parse(a.data.pubDate));
    return rss({
        // `<title>` field in output xml
        title: "Stabbity Style's blog",
        // `<description>` field in output xml
        description: 'Thoughts on stuff.',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: context.site + '/posts',
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            // Compute RSS link from post `slug`
            // This example assumes all posts are rendered as `/posts/[slug]` routes
            link: `/posts/${post.slug}/`,
            //content: post.body // TODO: Need to fix
        })),
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}