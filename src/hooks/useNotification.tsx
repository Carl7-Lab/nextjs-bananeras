import {
  ListItem,
  ToastId,
  UnorderedList,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';

type Notification = NotificationFunctions & NotificationDefaultFunctions;

type NotificationFunctions = {
  [key in 'success' | 'error' | 'warning' | 'info']: (
    options: UseToastOptions
  ) => ToastId;
};

type NotificationDefaultFunctions = {
  defaultError: () => ToastId;
};

export const useNotification = () => {
  const defaultOptions = { duration: 3000, isClosable: true };
  const toast = useToast();

  const success = (options: UseToastOptions) =>
    toast({ ...defaultOptions, ...options, status: 'success' });

  const info = (options: UseToastOptions) =>
    toast({ ...defaultOptions, ...options, status: 'info' });

  const warning = (options: UseToastOptions) =>
    toast({ ...defaultOptions, ...options, status: 'warning' });

  const error = (options: UseToastOptions) => {
    const errorMessages = {
      title: parseErrorMessage(options.title as string | string[]),
      description: parseErrorMessage(options.description as string | string[]),
    };

    return toast({
      ...defaultOptions,
      ...options,
      ...errorMessages,
      status: 'error',
    });
  };

  const defaultError = () => error({ title: 'Ooops, something went wrong' });

  const notification: Notification = {
    success,
    info,
    warning,
    error,
    defaultError,
  };

  return notification;
};

const parseErrorMessage = (errorMessage: string | string[]) => {
  if (Array.isArray(errorMessage) && errorMessage.length > 1) {
    return (
      <UnorderedList>
        {errorMessage.map((message, index) => (
          <ListItem key={index}>{message}</ListItem>
        ))}
      </UnorderedList>
    );
  }
  return errorMessage;
};
