<script>
  import { AppBar } from "@skeletonlabs/skeleton";
    import VisualIcon from "./icons/VisualIcon.svelte";
    import HomeIcon from "./icons/HomeIcon.svelte";

  const navItems = [
    { name: "Home", icon: HomeIcon, url: "/" },
    { name: "Data Visualization", icon: VisualIcon, url: "/visualization" },
  ];
</script>

<AppBar>
  <svelte:fragment slot="lead">Cansat 2024</svelte:fragment>
  <svelte:fragment slot="trail">
    <ul class="flex space-x-2">
      {#each navItems as { icon, name, url }}
        <li>
          <a class="btn hover:variant-ghost" href={url}>
            <span>{name}</span>
            <svelte:component this={icon} />
          </a>
        </li>
      {/each}
    </ul>
  </svelte:fragment>
</AppBar>
