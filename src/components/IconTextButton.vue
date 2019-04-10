<template functional>
  <q-btn
    flat
    :color="props.color || 'white'"
    size="sm"
    v-on="listeners"
    class="btn-icon-text"
    v-bind="data.attrs"
    :icon="props.icon"/>
</template>
