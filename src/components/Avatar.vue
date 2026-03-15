<template>
    <span :title="user.username">{{ slug }}</span>
</template>


<script setup lang="ts">
import { Auth } from '@/apis/auth';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { onBus, offBus } from '@/helpers/bus';

const user = ref({ username: 'user' });
const slug = computed(() => user.value.username.charAt(0));

const updateUser = (newUser: { username: string }) => {
    if (newUser?.username) {
        user.value.username = newUser.username;
    }
};

const onUserUpdated = (event: Event) => {
    const customEvent = event as CustomEvent;
    updateUser(customEvent.detail);
};

onMounted(() => {
    Auth.getInfo()
        .then((res: any) => {
            if (res.isLogin) {
                updateUser(res.data);
            }
        })
        .catch((err: any) => {
            console.error(err);
        });

    onBus('user:updated', onUserUpdated);
});

onUnmounted(() => {
    offBus('user:updated', onUserUpdated);
});
</script>


<style scoped>
span {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: #f2b81c;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
    margin-top: 15px;

}
</style>