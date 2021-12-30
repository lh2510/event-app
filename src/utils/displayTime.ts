export function displayTime(originalTime: string): string {
	const time = originalTime.slice(0, 16)
	const am = time.split('T')[1].startsWith('0') ? ' AM' : ' PM'
	const result = time.split('T')[0] + ', ' + time.split('T')[1] + am
	return result
}
