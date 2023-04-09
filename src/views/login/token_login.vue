<template>
  <!-- token登录 -->
  <div>
    跳转中。。。
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { SystemStoreUserInfoEnum, SystemStoreEnum } from '@/store/modules/systemStore/systemStore.d'
import { PageEnum } from '@/enums/pageEnum'
import { routerTurnByName } from '@/utils'
import { tokenLoginApi } from '@/api/path'
const $router = useRouter()
const systemStore = useSystemStore()

const t = window['$t']
const handleToken = async () => {
  const token = $router.currentRoute.value.query.token || ''
  console.log('token', token)
  const res = await tokenLoginApi({
    token: token
  }) as unknown as MyResponseType
  console.log(res, res.data)
  if(res.data) {
    const tokenValue = res.data.token
    const { avatar, nickname, username, id } = res.data.userinfo
    // 存储到 pinia
    systemStore.setItem(SystemStoreEnum.USER_INFO, {
      [SystemStoreUserInfoEnum.USER_TOKEN]: 'JWT ' + tokenValue,
      [SystemStoreUserInfoEnum.TOKEN_NAME]: 'Authorization',
      [SystemStoreUserInfoEnum.USER_ID]: id,
      [SystemStoreUserInfoEnum.USER_NAME]: username,
      [SystemStoreUserInfoEnum.NICK_NAME]: nickname,
      [SystemStoreUserInfoEnum.AVATAR]: avatar,
      t
    })
    window['$message'].success(t('login.login_success'))
    routerTurnByName(PageEnum.BASE_HOME_NAME, true)
  } else {
    window['$message'].error('token验证失败！')
    routerTurnByName(PageEnum.BASE_LOGIN_NAME, true)
  }
}

onMounted(() => {
  handleToken()
})
</script>

<style lang="scss" scoped>
</style>
