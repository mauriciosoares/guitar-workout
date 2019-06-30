export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((r, i) => ({
    ...r,
    order: i
  }));
};

export function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export function byId(list) {
  return list.reduce(
    (acc, item) => ({
      byId: {
        ...acc.byId,
        [item.id]: item
      },
      ids: [...acc.ids, item.id]
    }),
    { byId: {}, ids: [] }
  );
}
