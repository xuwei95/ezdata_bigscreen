// 公共类型声明
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BarLineConfig: ConfigType = {
    key: 'BarLine',
    chartKey: 'VBarLine',
    conKey: 'VCBarLine',
    title: '柱状加折线图',
    category: ChatCategoryEnum.COMBINATIONS,
    categoryName: ChatCategoryEnumName.COMBINATION,
    package: PackagesCategoryEnum.CHARTS,
    chartFrame: ChartFrameEnum.ECHARTS,
    image: 'bar_x.png'
}