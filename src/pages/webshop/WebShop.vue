<template>
  <div>
    <the-header></the-header>
    <section>
      <base-card>
        <h2>Kategorije</h2>

        <category-item>
          
        </category-item>

      </base-card>
    </section>
  </div>
</template>

<script>
import TheHeader from "../../components/layout/TheHeader.vue";
import CategoryItem from '../../components/article/CategoryItem.vue';

export default {
  components: { TheHeader, CategoryItem },
};
</script>