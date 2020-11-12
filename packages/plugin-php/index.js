import { PHP, PHP_FUNC } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';
import resolverTrustedUrl from '@octolinker/resolver-trusted-url';

export default {
  name: 'PHP',

  resolve(path, [target], meta, regExp) {
    if (target.startsWith('Illuminate\\')) {
      const targetPath = target.replace(/\\/g, '/');
      return resolverTrustedUrl({
        target: `https://laravel.com/api/8.x/${targetPath}.html`,
      });
    }

    if (target.startsWith('Symfony\\')) {
      const targetPath = target.replace(/\\/g, '/');

      return resolverTrustedUrl({
        target: `https://github.com/symfony/symfony/blob/5.x/src/${targetPath}.php`,
      });
    }

    if (target.startsWith('Doctrine\\')) {
      const targetPath = target.replace(/\\/g, '/');
      const [, repo] = targetPath.split('/');

      return resolverTrustedUrl({
        target: `https://github.com/doctrine/${repo}/blob/HEAD/lib/${targetPath}.php`,
      });
    }

    if (target.startsWith('Cake\\')) {
      const targetPath = target.replace(/\\/g, '.');

      return resolverTrustedUrl({
        target: `https://api.cakephp.org/4.1/class-${targetPath}.html`,
      });
    }

    if (target.includes('\\')) {
      return [];
    }

    if (regExp === PHP_FUNC) {
      return liveResolverQuery({
        type: 'ping',
        target: `https://www.php.net/manual/en/function.${target
          .toLowerCase()
          .replace(/_/g, '-')}.php`,
      });
    }

    return liveResolverQuery({
      type: 'ping',
      target: `https://www.php.net/manual/en/class.${target.toLowerCase()}.php`,
    });
  },

  getPattern() {
    return {
      pathRegexes: [/\.php$/],
      githubClasses: ['type-php', 'highlight-text-html-php'],
    };
  },

  getLinkRegexes() {
    return [PHP, PHP_FUNC];
  },
};
