import React, { useMemo } from 'react'
import { ErrorCallout } from "@/components/common/Callouts/ErrorCallouts"
import { Text } from '@radix-ui/themes'

// Utility functions
export const getErrorMessage = (error) => {
    const messages = getErrorMessages(error)
    return messages.map(m => m.message).join('\n')
}

const getErrorMessages = (error) => {
    if (!error) return []
    let eMessages = error?._server_messages ? JSON.parse(error?._server_messages) : []
    eMessages = eMessages.map((m) => {
        try {
            return JSON.parse(m)
        } catch (e) {
            return m
        }
    })

    if (eMessages.length === 0) {
        const indexOfFirstColon = error?.exception?.indexOf(':')
        if (indexOfFirstColon !== -1) {
            const exception = error?.exception?.slice(indexOfFirstColon + 1)
            if (exception) {
                eMessages = [{
                    message: exception,
                    title: "Error"
                }]
            }
        }

        if (eMessages.length === 0) {
            eMessages = [{
                message: error?.message,
                title: "Error",
                indicator: "red"
            }]
        }
    }
    return eMessages
}

// Main Component
export const ErrorBanner = ({ error, overrideHeading, children }) => {
    const messages = useMemo(() => {
        if (!error) return []
        let eMessages = error?._server_messages ? JSON.parse(error?._server_messages) : []
        eMessages = eMessages.map((m) => {
            try {
                return JSON.parse(m)
            } catch (e) {
                return m
            }
        })

        if (eMessages.length === 0) {
            const indexOfFirstColon = error?.exception?.indexOf(':')
            if (indexOfFirstColon !== -1) {
                const exception = error?.exception?.slice(indexOfFirstColon + 1)
                if (exception) {
                    eMessages = [{
                        message: exception,
                        title: "Error"
                    }]
                }
            }

            if (eMessages.length === 0) {
                eMessages = [{
                    message: error?.message,
                    title: "Error",
                    indicator: "red"
                }]
            }
        }
        return eMessages
    }, [error])

    const parseHeading = (message) => {
        if (message?.title === 'Message' || message?.title === 'Error') return undefined
        return message?.title
    }

    if (messages.length === 0 || !error) return null

    return (
        <ErrorCallout>
            {overrideHeading && <Text weight='bold' size='2'>{overrideHeading}</Text>}
            {messages.map((m, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: m.message }} />
            ))}
            {children}
        </ErrorCallout>
    )
}
