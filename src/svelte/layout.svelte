<script>
  export let title;
  export let aside;
  export let education;
  export let language;
  export let experience;
  export let skills;
</script>

<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>{title}</title>
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="//cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.min.css"
    />
    <link rel="stylesheet" type="text/css" href="./css/resume.css" />
    <link rel="stylesheet" type="text/css" href="./iconfont/iconfont.css" />
  </head>
  <body>
    {#if aside}
      <aside>
        <ul>
          {#each aside as val}
            <li>
              <a href="{val.href}" target="_blank">{val.content}</a>
            </li>
          {/each}
        </ul>
      </aside>
    {/if}
    <div class="container">
      <slot name="header"></slot>
      <slot name="content"></slot>
      <article class="content">
        <article class="column-6">
          {#if education}
            <slot name="education"></slot>
          {/if}
          {#if language}
            <slot name="language"></slot>
          {/if}
          {#if experience}
            <slot name="experience"></slot>
          {/if}
        </article>
        <article class="column-6 column">
          <slot name="skills"></slot>
        </article>
      </article>
    </div>
    <footer>
      <p>
        <a href="https://github.com/Lxxyx/LxxyxResume">LxxyxResume Generator</a>
        | is inspired by
        <a href="javascript:void">Joyee Cheung</a>
        | . MIT License.
      </p>
    </footer>
  </body>
</html>
