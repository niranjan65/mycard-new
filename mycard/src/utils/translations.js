
function format(message, replace) {
    return message.replace(/{(\d+)}/g, function (match, number) {
        return typeof replace[number] != 'undefined' ? replace[number] : match
    })
}

function translate(message, replace, context = null) {

    // @ts-ignore
    const translatedMessages = window?.frappe?.boot?.__messages || {}

    let translatedMessage = ''

    if (context) {
        let key = `${message}:${context}`
        if (translatedMessages[key]) {
            translatedMessage = translatedMessages[key]
        }
    }

    if (!translatedMessage) {
        translatedMessage = translatedMessages[message] || message
    }

    const hasPlaceholders = /{\d+}/.test(message)
    if (!hasPlaceholders) {
        return translatedMessage
    }

    return format(translatedMessage, replace)
}

export const __ = translate