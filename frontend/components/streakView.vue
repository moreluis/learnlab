<template>
    <div class="w-full rounded-md bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-amber-300/80 to-white text-left">
        <h2 class="text-xl font-bold text-black">
            Streak: {{ streak }} days
        </h2>
        <div class="flex items-center justify-between gap-4 mt-2 mb-1">
            <h6 class="block mono text-base font-medium text-black">
                Completed
            </h6>
            <h6 class="block mono text-base font-medium text-black">
                {{ Math.round(percentToNextMilestone) }}%
            </h6>
        </div>
        <!-- Hidden div with extended styles for TailwindCSS to load them -->
        <div class="hidden w-1/7 w-2/7 w-3/7 w-4/7 w-5/7 w-6/7"></div>
        <div class="flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-white my-1 rounded-md border-solid border-[1px] border-white font-sans text-xs font-medium">
            <div :class="width === 7 ? 'w-full' : `w-${width}/7`" class="flex items-center justify-center h-full overflow-hidden text-white break-all bg-amber-500/80 rounded-full"></div>
        </div>
        <p v-if="width === 7" class="mono text-base">Another week! Keep it going!</p>
        <p v-else class="mono text-base">{{ 7 - width }} days left until your next milestone!</p>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import isOlderThanYesterday from '~/utils/isOlderThanYesterday';
    const config = useRuntimeConfig();

    const props = defineProps({
        readOnly: {
            type: Boolean,
            required: false,
        },
    });

    let streak: globalThis.Ref<number | undefined> = ref<number | undefined>();
    let width: globalThis.Ref<number> = ref<number>(0);
    let percentToNextMilestone: globalThis.Ref<number> = ref<number>(0);

    onMounted(async () => {
        fetchStreak();
    });

    async function fetchStreak() {
        const url = process.env.NODE_ENV === 'production' ? config.public.apiBaseUrl : config.public.apiBaseUrl.replace('https', 'http');

        try {
            let response;
            if (props.readOnly) {
                response = await axios.get(`${url}/getAccount`, {
                    withCredentials: true,
                });
            } else {
                response = await axios.patch(`${url}/setStreak`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    streak.value = response.data.streak;
                    return;
                }
            }

            // console.log('Response:', response.data);

            if (!isOlderThanYesterday(response.data.day ?? response.data.user.streakLastUpdatedAt)) {
                streak.value = response.data.streak ?? response.data.user.streak;
            } else {
                streak.value = 0;
                if (response.data.user.streak !== 0) {
                    await axios.patch(`${url}/resetStreak`, {
                        withCredentials: true,
                    });
                }
            }

            calculateWidth();
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    }

    function calculateWidth() {
        if (!streak.value) return;
        const base: number = streak.value + stepsDownToDivisibleBy7(streak.value);
        const way: number = streak.value - base;
        const next: number = streak.value + stepsUpToDivisibleBy7(streak.value);
        const percent: number = way / (way + stepsUpToDivisibleBy7(streak.value)) * 100;
        percentToNextMilestone.value = percent;

        width.value = way;
    }

    function stepsUpToDivisibleBy7(number: number): number {
        if (number <= 0) {
            console.error("Input number should be greater than 0.");
        }

        let steps = 0;
        
        while (number % 7 !== 0) {
            number++;
            steps++;
        }

        return steps;
    }

    function stepsDownToDivisibleBy7(number: number): number {
        if (number <= 0) {
            console.error("Input number should be greater than 0.");
        }

        let steps = 0;
        
        while (number % 7 !== 0) {
            number--;
            steps--;
        }

        return steps;
    }
</script>