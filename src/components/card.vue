<template>
  <div>
    <b-col>
      <b-card
        :title="titlename"
        img-src="https://i.picsum.photos/id/25/600/300.jpg"
        img-top
        tag="article"
        class="mb-2"
        style="max-width:20rem"
        footer="Card Footer"
      >
        <b-card-text
          >Lorem, ipsum dolor sit amet consectetur adipisicing elit, Hic,
          aliquam?</b-card-text
        >
        <b-button
          v-b-modal="modalId"
          variant="primary"
          v-b-tooltip.hover
          title="Apply here"
          >Apply</b-button
        >
        <b-modal :id="modalId" title="Apply here info">
          <p class="my-4">Hello from modal</p>
        </b-modal>
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  props: ["titlename", "id"],
  computed: {
    modalId() {
      return `modal-${this.id}`;
    },
  },
};
</script>

<style lang="less" scoped></style>
