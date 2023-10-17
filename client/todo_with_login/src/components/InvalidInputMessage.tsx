function InvalidInputMessage({ message }: { message: string | undefined }) {
  return <div className="text-red-600 text-xs">{message}</div>;
}

export default InvalidInputMessage;
