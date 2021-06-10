<template>
  <div class="text-label" :style="styleText">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: ["text", "styleText"],
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="less">
.text-label {
  cursor: default;
}
</style>
