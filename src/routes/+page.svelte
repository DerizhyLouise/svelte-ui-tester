<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import * as Accordion from '$lib/components/ui/accordion';
    import { ChevronRight } from "lucide-svelte";
    import { Mail } from "lucide-svelte";
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Calendar as CalendarIcon } from 'lucide-svelte';
	import { type DateValue, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar';
    import { RangeCalendar } from "$lib/components/ui/range-calendar";

	// Date Picker Config
	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let valueDatePicker1: DateValue | undefined = undefined;
	let valueDatePicker2: DateValue | undefined = undefined;
	let valueDatePicker3: DateValue | undefined = undefined;

    const startDate1 = today(getLocalTimeZone());
    const endDate1 = startDate1.add({ days: 7 });

    let rangedCalValue1 = {
        start: startDate1,
        end: endDate1
    };
	// End of Date Picker Config

	// Combobox Config
	const json = [
		{
			value: 'val1',
			label: 'Value 1'
		},
		{
			value: 'val2',
			label: 'Value 2'
		}
	];

	let openCb1 = false;
	let openCb2 = false;
	let cb1Value = '';  
	let cb2Value = '';

	$: cb1Value = json.find((f) => f.value === cb1Value)?.label ?? 'Select anything...';
	$: cb2Value = json.find((f) => f.value === cb2Value)?.label ?? 'Select anything...';

	function closeAndFocusTrigger(triggerId: string, popoverType: "cb1" | "cb2") {
		if (popoverType === "cb1") {
            openCb1 = false;
        } else if (popoverType === "cb2") {
            openCb2 = false;
        }
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	// End of Combo Box Config

    // Check Box Config
    let checkbox11 = false;
    let checkbox12 = false;
    let checkbox13 = false;
    let checkbox21 = false;
    let checkbox22 = false;
    let checkbox23 = false;
    let checkbox24 = false;
    // End of Check Box Config
</script>

<body>
	<header class="flex h-28 w-screen justify-center bg-yellow-200"></header>
	<div class="mt-2 flex justify-center">
		<Tabs.Root value="tab1" class="m-8 h-full w-[90vw] rounded-md border-2">
			<Tabs.List class="grid w-full grid-cols-3">
				<Tabs.Trigger value="tab1">Tab1</Tabs.Trigger>
				<Tabs.Trigger value="tab2">Tab2</Tabs.Trigger>
				<Tabs.Trigger value="tab3">Tab3</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="tab1">
				<Accordion.Root class="w-full sm:max-w-[100%]" multiple value={['info1', 'info2']}>
					<Accordion.Item value="info1">
						<Accordion.Trigger class="text-lg font-bold hover:no-underline">Input</Accordion.Trigger>
						<Accordion.Content>
							<Card.Root>
								<Card.Content class="space-y-2 pt-4 text-xs">
									<div class="flex flex-wrap">
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input1">Input 1 (text)</label>
											</div>
											<div class="pr-4 md:w-2/3">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input1" type="text"
												/>
											</div>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input2">Input 2 (number)</label>
											</div>
											<div class="pr-4 md:w-2/3">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input2" type="number"/>
											</div>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input3">Input 3 (disabled)</label>
											</div>
											<div class="pr-4 md:w-2/3">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input3" type="text" disabled/>
											</div>
										</div>
										<div class="mb-2 md:flex md:w-[100%] md:items-center 2xl:w-2/3">
											<div class="md:w-1/6">
												<label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="input4">Input 4 (required)*</label>
											</div>
											<div class="pr-4 md:w-5/6">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input4" type="text" required/>
											</div>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input5">Input 5 (email)</label>
											</div>
											<div class="pr-4 md:w-2/3">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input5" type="email"/>
											</div>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input6">Input 6 (password)</label>
											</div>
											<div class="pr-4 md:w-2/3">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input6" type="password"/>
											</div>
										</div>
										<div class="mb-2 md:flex md:w-[100%] md:items-center 2xl:w-2/3">
											<div class="md:w-1/6">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input7">Input 7</label>
											</div>
											<div class="pr-4 md:w-5/6">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input7" type="text"/>
											</div>
										</div>
										<div class="mb-2 md:flex md:w-[100%] md:items-center 2xl:w-2/3">
											<div class="md:w-1/6">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input8">Input 8</label>
											</div>
											<div class="pr-4 md:w-5/6">
												<Textarea placeholder="Type your message here." />
											</div>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="input9">Input 9</label>
											</div>
											<div class="pr-4 md:w-2/3">
												<input class="bg-white-200 h-8 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:outline-none disabled:bg-gray-200"
													id="input9" type="text"/>
											</div>
										</div>
									</div>
								</Card.Content>
							</Card.Root>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="info2">
						<Accordion.Trigger class="text-lg font-bold hover:no-underline">Picker / Combobox / Radio Button / Checkbox</Accordion.Trigger>
						<Accordion.Content>
							<Card.Root>
								<Card.Content class="space-y-2 pt-4 text-xs">
									<div class="flex flex-wrap">
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="datepicker1">Datepicker 1</label>
											</div>
											<Popover.Root>
												<Popover.Trigger asChild let:builder>
													<Button variant="outline" class={cn('ml-2 mr-4 w-2/3 justify-start border-gray-200 bg-white text-left font-normal', !valueDatePicker1 && 'text-muted-foreground')}
														builders={[builder]}>
														<CalendarIcon class="mr-2 h-4 w-4" />
														{valueDatePicker1 ? df.format(valueDatePicker1.toDate(getLocalTimeZone())) : 'Pick a date'}
													</Button>
												</Popover.Trigger>
												<Popover.Content class="p-0" sameWidth>
													<Calendar bind:value={valueDatePicker1} initialFocus />
												</Popover.Content>
											</Popover.Root>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="datepicker2">Datepicker 2</label>
											</div>
											<Popover.Root>
												<Popover.Trigger asChild let:builder>
													<Button variant="outline" class={cn('ml-2 mr-4 w-2/3 justify-start border-gray-200 bg-white text-left font-normal', !valueDatePicker2 && 'text-muted-foreground')}
														builders={[builder]}>
														<CalendarIcon class="mr-2 h-4 w-4" />
														{valueDatePicker2 ? df.format(valueDatePicker2.toDate(getLocalTimeZone())) : 'Pick a date'}
													</Button>
												</Popover.Trigger>
												<Popover.Content class="p-0" sameWidth>
													<Calendar bind:value={valueDatePicker2} initialFocus />
												</Popover.Content>
											</Popover.Root>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="datepicker3">Datepicker 3</label>
											</div>
                                            <Popover.Root>
												<Popover.Trigger asChild let:builder>
													<Button variant="outline" class={cn('ml-2 mr-4 w-2/3 justify-start border-gray-200 bg-white text-left font-normal', !valueDatePicker3 && 'text-muted-foreground')}
														builders={[builder]}>
														<CalendarIcon class="mr-2 h-4 w-4" />
														{valueDatePicker3 ? df.format(rangedCalValue1.start.toDate(getLocalTimeZone())) : 'Pick a date'}
														<!-- {valueDatePicker3 ? df.format(rangedCalValue1.end.toDate(getLocalTimeZone())) : ''} -->
													</Button>
												</Popover.Trigger>
												<Popover.Content class="p-0" sameWidth>
													<RangeCalendar bind:value={rangedCalValue1} class="border rounded-md" initialFocus/>
												</Popover.Content>
											</Popover.Root>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="cb1">Combobox 1</label>
											</div>
											<Popover.Root bind:open={openCb1} let:ids>
												<Popover.Trigger asChild let:builder>
													<Button builders={[builder]} variant="outline" role="combobox" aria-expanded={openCb1} class="justify-between ml-2 mr-4 w-2/3">
														{cb1Value}
														<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</Popover.Trigger>
												<Popover.Content class="p-0" sameWidth>
													<Command.Root>
														<Command.Input placeholder="Search Anything..." />
														<Command.Empty>Nothing found.</Command.Empty>
														<Command.Group>
															{#each json as item}
																<Command.Item value={item.value}
																	onSelect={(currentValue) => {
																		cb1Value = currentValue;
																		closeAndFocusTrigger(ids.trigger, 'cb1');
																	}}>
																	<Check class={cn( 'mr-2 h-4 w-4', cb1Value !== item.value && 'text-transparent')}/>
																	{item.label}
																</Command.Item>
															{/each}
														</Command.Group>
													</Command.Root>
												</Popover.Content>
											</Popover.Root>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="cb2">Combobox 2</label>
											</div>
											<Popover.Root bind:open={openCb2} let:ids>
												<Popover.Trigger asChild let:builder>
													<Button builders={[builder]} variant="outline" role="combobox" aria-expanded={openCb2} class="justify-between ml-2 mr-4 w-2/3">
														{cb2Value}
														<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</Popover.Trigger>
												<Popover.Content class="p-0" sameWidth>
													<Command.Root>
														<Command.Input placeholder="Search Anything..." />
														<Command.Empty>Nothing found.</Command.Empty>
														<Command.Group>
															{#each json as item}
																<Command.Item value={item.value}
																	onSelect={(currentValue) => {
																		cb2Value = currentValue;
																		closeAndFocusTrigger(ids.trigger, 'cb2');
																	}}>
																	<Check class={cn( 'mr-2 h-4 w-4', cb2Value !== item.value && 'text-transparent')}/>
																	{item.label}
																</Command.Item>
															{/each}
														</Command.Group>
													</Command.Root>
												</Popover.Content>
											</Popover.Root>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="rb1">Radio Button 1</label>
											</div>
											<RadioGroup.Root value="rb1Val1" class="flex justify-start flex-wrap pr-4 md:w-2/3">
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb1Val1" id="rb1Val1" />
                                                    <Label for="rb1Val1">Value RB1</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb1Val2" id="rb1Val2" />
                                                    <Label for="rb1Val2">Value RB2</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb1Val3" id="rb1Val3" />
                                                    <Label for="rb1Val3">Value RB3</Label>
                                                </div>
                                                <RadioGroup.Input name="rb1" />
                                            </RadioGroup.Root>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="rb2">Radio Button 2</label>
											</div>
											<RadioGroup.Root value="rb2Val1" class="flex justify-start flex-wrap pr-4 md:w-2/3">
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb2Val1" id="rb2Val1" />
                                                    <Label for="rb2Val1">Value RB1</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb2Val2" id="rb2Val2" />
                                                    <Label for="rb2Val2">Value RB2</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb2Val3" id="rb2Val3" />
                                                    <Label for="rb2Val3">Value RB3</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb2Val4" id="rb2Val4" />
                                                    <Label for="rb2Val4">Value RB3</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb2Val5" id="rb2Val5" />
                                                    <Label for="rb2Val5">Value RB3</Label>
                                                </div>
                                                <RadioGroup.Input name="rb2" />
                                            </RadioGroup.Root>
										</div>
										<div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="rb3">Radio Button 3</label>
											</div>
											<RadioGroup.Root value="rb3Val1" class="flex flex-col pr-4 md:w-2/3">
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb3Val1" id="rb3Val1" />
                                                    <Label for="rb3Val1">Value RB1</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb3Val2" id="rb3Val2" />
                                                    <Label for="rb3Val2">Value RB2</Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <RadioGroup.Item value="rb3Val3" id="rb3Val3" />
                                                    <Label for="rb3Val3">Value RB3</Label>
                                                </div>
                                                <RadioGroup.Input name="rb2" />
                                            </RadioGroup.Root>
										</div>
                                        <div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="chb1">Check Box 1</label>
											</div>
                                            <div class="flex flex-col gap-2 pr-4 md:w-2/3">
                                                <div class="flex items-center space-x-2">
                                                    <Checkbox id="chb1Val1" bind:checked={checkbox11} aria-labelledby="chb1Val1-label" />
                                                    <Label id="chb1Val1-label" for="chb1Val1" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Value 1
                                                    </Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <Checkbox id="chb1Val2" bind:checked={checkbox12} aria-labelledby="chb1Val2-label" />
                                                    <Label id="chb1Val2-label" for="chb1Val2" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Value 2
                                                    </Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <Checkbox id="chb1Val3" bind:checked={checkbox13} aria-labelledby="chb1Val3-label" />
                                                    <Label id="chb1Val3-label" for="chb1Val3" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Value 3
                                                    </Label>
                                                </div>
                                            </div>
										</div>
                                        <div class="mb-2 md:flex md:w-1/2 md:items-center 2xl:w-1/3">
											<div class="md:w-1/3">
												<label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="chb2">Check Box 2</label>
											</div>
                                            <div class="flex justify-start flex-wrap gap-2 pr-4 md:w-2/3">
                                                <div class="flex items-center space-x-2">
                                                    <Checkbox id="chb2Val1" bind:checked={checkbox21} aria-labelledby="chb2Val1-label" />
                                                    <Label id="chb2Val1-label" for="chb2Val1" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Value 1
                                                    </Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <Checkbox id="chb2Val2" bind:checked={checkbox22} aria-labelledby="chb2Val2-label" />
                                                    <Label id="chb2Val2-label" for="chb2Val2" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Value 2
                                                    </Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <Checkbox id="chb2Val3" bind:checked={checkbox23} aria-labelledby="chb2Val3-label" />
                                                    <Label id="chb2Val3-label" for="chb2Val3" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Value 3
                                                    </Label>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <Checkbox id="chb2Val4" bind:checked={checkbox24} aria-labelledby="chb2Val4-label" />
                                                    <Label id="chb2Val4-label" for="chb2Val4" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Value 3
                                                    </Label>
                                                </div>
                                            </div>
										</div>
									</div>
								</Card.Content>
							</Card.Root>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
                <div class="py-8 flex justify-end gap-2">
                    <Button>Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button><Mail class="mr-2 h-4 w-4" />Email</Button>
                    <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                </div>
			</Tabs.Content>
			<Tabs.Content value="tab2"></Tabs.Content>
			<Tabs.Content value="tab3"></Tabs.Content>
		</Tabs.Root>
	</div>
</body>
