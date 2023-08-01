<template>
  <div class="go-tables-basic">
    <n-input v-model:value="inputData"
             placeholder="请输入信息"
             :style="`display:${option.inputShow}`"
             style="margin-bottom: 5px;float:right;width: 240px" />
    <n-data-table :style="`
      width:${w}px;
      height:${h}px;
      font-size:${option.style.fontSize}px;
      border-width:${option.style.border === 'on'?option.style.borderWidth:0}px;
      border-color:${option.style.borderColor};
      border-style:${option.style.borderStyle}`"
                  :bordered="option.style.border === 'on'"
                  :single-column="option.style.singleColumn === 'on'"
                  :single-line="option.style.singleLine === 'on'"
                  :bottom-bordered="option.style.bottomBordered === 'on'"
                  :striped="option.style.striped === 'on'"
                  :max-height="h"
                  size="small"
                  :columns="option.dataset.dimensions"
                  :data="filterData"
                  :pagination="pagination"
                  />
  </div>
</template>

<script setup lang="ts">
import { computed,PropType, toRefs, watch, reactive,ref } from 'vue';
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

//查询字段
const inputData = ref('');
//前台过滤
const filterData = computed(()=>{
    return option?.dataset?.source?.filter((item:any)=>{
      return Object.values(item).some(val=>{
        return String(val).toLowerCase().includes(inputData.value.toLowerCase())
      })
    })
})

const {
  align,
  pagination
} = toRefs(
  props.chartConfig.option
) 
pagination.value.onChange = (page: number) => {
  pagination.value.page = page
}

const { w, h } = toRefs(props.chartConfig.attr)

const option = reactive({
  dataset : props.chartConfig.option.dataset,
  style : props.chartConfig.option.style,
  inputShow : props.chartConfig.option.inputShow
})

watch(
    () => props.chartConfig.option.dataset,
    (newData:any)=>{
      option.dataset = newData;
      option?.dataset?.dimensions?.forEach((header: any) => {
            //对齐方式更新
            header.align = align.value;
      });
    },
    {
      immediate:true,
      deep:true
    }
)

</script>

<style lang="scss" scoped>
@include go('tables-basic') {
  margin: 0 !important;
  padding: 0 !important;
}

</style>
