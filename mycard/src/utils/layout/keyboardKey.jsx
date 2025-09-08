import { BiSpaceBar, BiCommand, BiChevronUp } from 'react-icons/bi';
import { BsOption, BsArrowReturnLeft } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { LuArrowBigLeft, LuArrowBigDown, LuArrowBigRight, LuArrowBigUp, LuArrowBigUpDash, LuArrowRightToLine } from 'react-icons/lu';

export const getKeyboardMetaKeyString = () => {
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
        return '⌘';
    } else {
        return 'Ctrl';
    }
};

export const KEYBOARD_KEY_STRING_MAP = {
    'shift': '⇧',
    'ctrl': '⌃',
    'alt': '⌥',
    'meta': getKeyboardMetaKeyString(),
    'left': '←',
    'up': '↑',
    'right': '→',
    'tab': '⇥',
    'down': '↓',
    'space': '␣',
    'backspace': '⌫',
    'delete': '⌦',
    'del': '⌦',
    'enter': '⏎',
    'return': '⏎',
};

export const KeyboardMetaKeyIcon = (props) => {
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
        return <BiCommand {...props} />;
    } else {
        return <BiChevronUp {...props} />;
    }
};

export const KeyboardKeyIcon = (props) => {
    const { key, ...rest } = props;
    switch (key) {
        case 'meta':
            return <KeyboardMetaKeyIcon {...rest} />;
        case 'shift':
            return <LuArrowBigUpDash {...rest} />;
        case 'ctrl':
            return <BiChevronUp {...rest} />;
        case 'alt':
            return <BsOption {...rest} />;
        case 'backspace':
        case 'del':
        case 'delete':
            return <FiDelete {...rest} />;
        case 'return':
        case 'enter':
            return <BsArrowReturnLeft {...rest} />;
        case 'space':
            return <BiSpaceBar {...rest} />;
        case 'tab':
            return <LuArrowRightToLine {...rest} />;
        case 'up':
            return <LuArrowBigUp {...rest} />;
        case 'down':
            return <LuArrowBigDown {...rest} />;
        case 'left':
            return <LuArrowBigLeft {...rest} />;
        case 'right':
            return <LuArrowBigRight {...rest} />;
        default:
            return null;
    }
};
