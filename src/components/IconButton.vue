<template functional>
  <q-btn
    flat
    round
    color="white"
    v-on="listeners"
    v-bind="data.attrs"
    :icon="props.icon"/>
</template>
