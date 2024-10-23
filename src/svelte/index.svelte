<script>
  export let header;
  export let education;
  export let language;
  export let experience;
  export let skills;
  export let aside;
</script>

<main>
  <header>
    <figure class="qrcode">
      <img src="./img/wechat.jpg" alt="WeChat QR Code" />
    </figure>
    <section class="title">
      <h1>{header.title.name}</h1>
      <h2>{header.title.job}</h2>
    </section>
    <address>
      <ul class="contacts">
        <li class="icon-phone">
          <a href="tel:{header.contacts.phone}">{header.contacts.phone}</a>
        </li>
        <li class="icon-mail">
          <a href="mailto:{header.contacts.mail}">{header.contacts.mail}</a>
        </li>
        <li class="icon-wechat wechat">{header.contacts.wechat}</li>
        {#if header.contacts.weibo}
          <li class="icon-weibo">
            <a href="{header.contacts.weibo.href}">{header.contacts.weibo.name}</a>
          </li>
        {/if}
        {#if header.contacts.github}
          <li class="icon-github">
            <a href="{header.contacts.github.href}">{header.contacts.github.name}</a>
          </li>
        {/if}
        {#if header.contacts.blog}
          <li class="icon-blog">
            <a href="{header.contacts.blog.href}">{header.contacts.blog.name}</a>
          </li>
        {/if}
      </ul>
    </address>
  </header>

  <section class="education">
    <div class="sec-title-wrapper icon-book">
      <h3 class="sec-title">
        <span class="sec-zh">教育经历</span>
        <span class="sec-en">Education</span>
      </h3>
    </div>
    <div class="timeline-wrapper">
      <ul class="sec-content timeline">
        <li class="timeline-item icon-flags">
          <h3 class="timeline-title">
            <time class="education-time">{education.time}</time>
          </h3>
          <dl class="education-content">
            <dt class="education-name">{education.name}</dt>
            <dd class="education-major icon-hat">{education.major}</dd>
            {#each education.honor as val}
              <dd class="education-honor icon-trophy">{@html val}</dd>
            {/each}
          </dl>
        </li>
      </ul>
    </div>
  </section>

  <section class="language">
    <div class="sec-title-wrapper icon-chat">
      <h3 class="sec-title">
        <span class="sec-zh">语言水平</span>
        <span class="sec-en">Language</span>
      </h3>
    </div>
    <div class="sec-content">
      <dl class="language-certificates">
        {#each language.cert as val}
          <div class="language-cert-wrapper">
            <dt class="language-cert-type">{val.name}</dt>
            <dd class="progress">
              <div class="progress-bar" style="width: {val.grade / val.fullmarks * 100}%">
                <span class="progress-label">{val.grade}</span>
              </div>
            </dd>
          </div>
        {/each}
      </dl>
      <ul class="language-skills">
        {#each language.skills as val}
          <li class="icon-star">{val}</li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="experience">
    <div class="sec-title-wrapper icon-rocket">
      <h3 class="sec-title">
        <span class="sec-zh">项目与工作经验</span>
        <span class="sec-en">Experience</span>
      </h3>
    </div>
    <div class="timeline-wrapper">
      <ul class="sec-content timeline">
        {#each experience as val}
          <li class="timeline-item icon-bag">
            <h3 class="timeline-title">
              <span class="experience-place">{val.title.place}</span>
              {#if val.title.time}
                <time class="experience-time">{val.title.time}</time>
              {:else if val.title.links}
                {#each val.title.links as link}
                  <a class="experience-link" href="{link.href}" target="_blank">{link.name}</a>
                {/each}
              {/if}
            </h3>
            <dl class="experience-content">
              <dt class="experience-position">{val.content.position}</dt>
              {#each val.content.tasks as task}
                <dd class="experience-task icon-gear">{@html task}</dd>
              {/each}
            </dl>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="skills">
    <div class="sec-title-wrapper icon-wrench">
      <h3 class="sec-title">
        <span class="sec-zh">技能</span>
        <span class="sec-en">Skills</span>
      </h3>
    </div>
    <div class="timeline-wrapper">
      <ul class="sec-content timeline">
        <li class="timeline-item icon-flags">
          <h3 class="timeline-title">
            <span class="skill">{skills.flags.name}</span>
          </h3>
          {#each skills.flags.skill as skill}
            <dl class="skill-content">
              <dt class="skill-name">{@html skill.name}</dt>
              {#each skill.description as description}
                <dd class="skill-description icon-star">{@html description}</dd>
              {/each}
            </dl>
          {/each}
        </li>
        {#if skills.cloud}
          <li class="timeline-item icon-cloud">
            <h3 class="timeline-title">
              <span class="skill">{skills.cloud.name}</span>
            </h3>
            {#each skills.cloud.skill as skill}
              <dl class="skill-content">
                <dt class="skill-name">{@html skill.name}</dt>
                {#each skill.description as description}
                  <dd class="skill-description icon-star">{@html description}</dd>
                {/each}
              </dl>
            {/each}
          </li>
        {/if}
        {#if skills.gears}
          <li class="timeline-item icon-gears">
            <h3 class="timeline-title">
              <span class="skill">{skills.gears.name}</span>
            </h3>
            {#each skills.gears.skill as skill}
              <dl class="skill-content">
                <dt class="skill-name">{@html skill.name}</dt>
                {#each skill.description as description}
                  <dd class="skill-description icon-star">{@html description}</dd>
                {/each}
              </dl>
            {/each}
          </li>
        {/if}
      </ul>
    </div>
  </section>
</main>
